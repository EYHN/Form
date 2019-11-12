import * as React from 'react';
import {Motion, spring} from 'react-motion';
import MultiRef from 'react-multi-ref';
import MoveContainer from './MoveContainer';

interface HeightData {
  natural: number;
  drag: number;
};

const DEFAULT_HEIGHT: HeightData = {natural: 200, drag: 30};

function getScrollSpeed(distance: number, speed: number, size: number) {
  // If distance is zero, then the result is the max speed. Otherwise,
  // the result tapers toward zero as it gets closer to the opposite
  // edge of the region.
  return Math.round(speed - (speed / size) * distance);
}

type Drag = {
  itemKey: string;

  // The y position of the dragged item when the drag started. This will be
  // equal to the initial mouseY value. The items not being dragged will be
  // positioned so that the dragged item's original position lines up with
  // startY.
  startY: number;

  // The y-position that corresponds to the mouse's current location. The
  // dragged item will be rendered with this as its y-position.
  mouseY: number;

  // This is the difference between the raw mouse y value and startY. For
  // example, if a user clicks the drag handle at a point 5 px below the item's
  // top, then mouseOffset will be set to 5. As the user moves their mouse, we
  // update mouseY to be the raw mouse y value minus mouseOffset.
  mouseOffset: number;
};

export interface TemplateProps<I,C> {
  item: I;
  itemSelected: number;
  anySelected: number;
  dragHandleProps: any;
  commonProps: C;
}

interface Props<I,C,T> {
  itemKey: string|((item: I)=>string);
  template: T;
  list: ReadonlyArray<I>;
  onMoveEnd?: (newList: ReadonlyArray<I>, movedItem: I, oldIndex: number, newIndex: number) => void;
  container?: () => HTMLElement | null | undefined;
  constrainDrag?: boolean;
  springConfig?: any;
  padding?: number;
  unsetZIndex?: boolean;
  autoScrollMaxSpeed?: number;
  autoScrollRegionSize?: number;
  commonProps?: C;
}

interface State {
  useAbsolutePositioning?: boolean;
  dragging?: boolean;
  lastDrag?: Drag;
  heights?: {[key: string]: HeightData};
};

export default class DraggableList<I,C,T extends React.ComponentType<Partial<TemplateProps<I,C>>>> extends React.Component<Props<I,C,T>, State> {
  static defaultProps = {
    springConfig: {stiffness: 300, damping: 50},
    padding: 10,
    unsetZIndex: false,
    constrainDrag: false,
    autoScrollMaxSpeed: 10,
    autoScrollRegionSize: 30
  };
  _itemRefs: MultiRef<string, MoveContainer<I,any,T>> = new MultiRef();
  _autoScrollerTimer: any;

  _listRef = React.createRef<HTMLDivElement>();

  constructor(props: Props<I,C,T>) {
    super(props);
    this.state = {
      useAbsolutePositioning: false,
      dragging: false,
      lastDrag: null,
      heights: null
    };
  }

  getItemInstance(key: string): T {
    const ref = this._itemRefs.map.get(key);
    if (!ref) throw new Error('key not found');
    return ref.getTemplate();
  }

  static getDerivedStateFromProps<I,C,T>(newProps: Props<I,C,T>, state: State): State {
    const {list} = newProps;
    const {lastDrag} = state;

    if (lastDrag) {
      const keyFn = DraggableList._getKeyFn<I>(newProps.itemKey);

      try {
        DraggableList._getIndexOfItemWithKey<I>(keyFn, list, lastDrag.itemKey);
      } catch (err) {
        return {dragging: false, lastDrag: null};
      }
    }

    return null;
  }

  componentWillUnmount() {
    this._handleMouseUp();
  }

  _handleTouchStart(itemKey: string, pressY: number, event: TouchEvent) {
    if (event.cancelable === false) return;
    event.stopPropagation();
    this._handleStartDrag(itemKey, pressY, event.touches[0].pageY);
  }

  _handleMouseDown(itemKey: string, pressY: number, event: MouseEvent) {
    event.preventDefault();
    this._handleStartDrag(itemKey, pressY, event.pageY);
  }

  _handleStartDrag(itemKey: string, pressY: number, pageY: number) {
    if (document.documentElement) document.documentElement.style.cursor = 'move';
    window.addEventListener('mouseup', this._handleMouseUp);
    window.addEventListener('touchend', this._handleMouseUp, {passive: false});
    window.addEventListener('touchmove', this._handleTouchMove, {passive: false});
    window.addEventListener('mousemove', this._handleMouseMove);

    // If an element has focus while we drag around the parent, some browsers
    // try to scroll the parent element to keep the focused element in view.
    // Stop that.
    {
      const listEl = this._listRef.current;
      if (!listEl) throw new Error('Should not happen');
      if (
        listEl.contains && document.activeElement &&
        listEl.contains(document.activeElement) &&
        document.activeElement instanceof HTMLElement
      ) {
        document.activeElement.blur();
      }
    }

    const keyFn = this._getKeyFn();

    let newHeights = null;
    if (this.state.heights == null) {
      const _newHeights: {[key: string]: HeightData} = {};

      this.props.list.forEach(item => {
        const key = keyFn(item);
        const containerRef = this._itemRefs.map.get(key);
        const refEl = containerRef ? containerRef.getDOMNode().firstElementChild : null;
        const ref = containerRef ? containerRef.getTemplate() : null;
        const natural = (refEl instanceof HTMLElement) ?
          refEl.offsetHeight : DEFAULT_HEIGHT.natural;
        const drag = ref && (typeof (ref as any).getDragHeight === 'function') && (ref as any).getDragHeight() || natural;

        _newHeights[key] = {natural, drag};
      });

      newHeights = _newHeights;
    }

    // Need to re-render once before we start dragging so that the `y` values
    // are set using the correct state.heights and then can animate from there.

    const afterHeights = () => {
      const itemIndex = this.props.list.map(keyFn).indexOf(itemKey);

      // pressY will be non-null if the list is currently animating (because the
      // clicked item has its `y` prop set). pressY will be null if the list is
      // not currently animating (because the clicked item will be at its
      // natural position, which is calculatable using _getDistance).
      const startY = pressY == null ?
        this._getDistance(0, itemIndex, false) : pressY;

      const containerEl = this._getContainer();
      const containerScroll = !containerEl || containerEl === document.body ?
        0 : containerEl.scrollTop;

      this.setState({
        useAbsolutePositioning: true,
        dragging: true,
        lastDrag: {
          itemKey: itemKey,
          startY,
          mouseY: startY,
          mouseOffset: pageY - startY + containerScroll
        }
      });
    };

    if (newHeights) {
      this.setState({heights: newHeights}, afterHeights);
    } else {
      afterHeights();
    }
  }

  _handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    this._handleMouseMove(e.touches[0]);
  };

  _handleMouseMove = ({pageY, clientY}: {pageY: number, clientY: number}) => {
    const {
      list,
      autoScrollMaxSpeed,
      autoScrollRegionSize
    } = this.props;
    const {dragging, lastDrag} = this.state;
    if (!dragging || !lastDrag) return;

    const containerEl = this._getContainer();
    const dragVisualIndex = this._getDragVisualIndex();
    const keyFn = this._getKeyFn();

    clearTimeout(this._autoScrollerTimer);

    // If the user has the mouse near the top or bottom of the container and
    // not at the end of the list, then autoscroll.
    if (true || dragVisualIndex !== 0 && dragVisualIndex !== list.length-1) {
      let scrollSpeed = 0;

      const containerRect = containerEl && containerEl !== document.body &&
        containerEl.getBoundingClientRect ?
        containerEl.getBoundingClientRect() :
        {top: 0, bottom: Infinity};
      
      const scrollTop = !containerEl || containerEl === document.body ?
        window.scrollY : containerEl.scrollTop;

      // Get the lowest of the screen top and the container top.
      const top = Math.max(0, containerRect.top);

      const distanceFromTop = clientY-top;
      if (distanceFromTop < autoScrollRegionSize && scrollTop > 0) {
        scrollSpeed = -1 * getScrollSpeed(distanceFromTop, autoScrollMaxSpeed, autoScrollRegionSize);
      } else {
        // Get the lowest of the screen bottom and the container bottom.
        const bottom = Math.min(window.innerHeight, containerRect.bottom);
        const scrollBottom = !containerEl || containerEl === document.body ?
          document.body.offsetHeight - window.innerHeight - window.scrollY : containerEl.offsetHeight - containerEl.clientHeight - containerEl.scrollTop;
        const distanceFromBottom = bottom-clientY;
        if (distanceFromBottom < autoScrollRegionSize && scrollBottom > 0) {
          scrollSpeed = getScrollSpeed(distanceFromBottom, autoScrollMaxSpeed, autoScrollRegionSize);
        }
      }

      if (scrollSpeed !== 0) {
        this._scrollContainer(scrollSpeed);
        this._autoScrollerTimer = setTimeout(() => {
          this._handleMouseMove({
            pageY: pageY + (containerEl===document.body?scrollSpeed:0),
            clientY
          });
        }, 16);
      }
    }

    const containerScroll = !containerEl || containerEl === document.body ?
      0 : containerEl.scrollTop;
    let mouseY = pageY - lastDrag.mouseOffset + containerScroll;
    if (this.props.constrainDrag) {
      const visualList = this._getVisualListDuringDrag();

      mouseY = Math.max(mouseY, this._getDistanceFromTopDuringDrag(lastDrag, keyFn(visualList[0]), visualList));
      mouseY = Math.min(mouseY, this._getDistanceFromTopDuringDrag(lastDrag, keyFn(visualList[visualList.length - 1]), visualList));
    }

    this.setState({lastDrag: {...lastDrag, mouseY}});
  };

  _handleMouseUp = () => {
    clearInterval(this._autoScrollerTimer);
    window.removeEventListener('mouseup', this._handleMouseUp);
    window.removeEventListener('touchend', this._handleMouseUp);
    window.removeEventListener('touchmove', this._handleTouchMove);
    window.removeEventListener('mousemove', this._handleMouseMove);

    if (document.documentElement) document.documentElement.style.cursor = '';
    this._lastScrollDelta = 0;

    const {list, onMoveEnd} = this.props;
    const {dragging, lastDrag} = this.state;

    if (dragging && lastDrag && onMoveEnd) {
      const dragIndex = this._getDragListIndex();
      const newIndex = this._getDragVisualIndex();

      if (dragIndex !== newIndex) {
        const newList = this._getVisualListDuringDrag();

        onMoveEnd(newList, list[dragIndex], dragIndex, newIndex);
      }
      this.setState({dragging: false});
    }
  };

  _scrollContainer(delta: number) {
    const containerEl = this._getContainer();
    if (!containerEl) return;
    if (window.scrollBy && containerEl === document.body) {
      window.scrollBy(0, delta);
    } else {
      containerEl.scrollTop += delta;
    }
  }

  _lastScrollDelta: number = 0;
  _adjustScrollAtEnd(delta: number) {
    const frameDelta = Math.round(delta - this._lastScrollDelta);
    this._scrollContainer(frameDelta);
    this._lastScrollDelta += frameDelta;
  }

  static _getIndexOfItemWithKey<I>(keyFn: (item: I) => string, list: ReadonlyArray<I>, itemKey: string): number {
    for (let i=0, len=list.length; i < len; i++) {
      if (keyFn(list[i]) === itemKey) {
        return i;
      }
    }
    throw new Error('Failed to find drag index');
  }

  _getDragListIndex(): number {
    const {list} = this.props;
    const {lastDrag} = this.state;
    if (!lastDrag) {
      throw new Error('No drag happened');
    }
    const keyFn = this._getKeyFn();
    return DraggableList._getIndexOfItemWithKey(keyFn, list, lastDrag.itemKey);
  }

  _getDragVisualIndex(): number {
    const {list, padding} = this.props;
    const {dragging, lastDrag} = this.state;
    if (!dragging || !lastDrag) throw new Error('Should not happen');

    const dragListIndex = this._getDragListIndex();

    const {mouseY, startY} = lastDrag;

    const movementFromNatural = mouseY-startY;
    // 1 down, -1 up, 0 neither
    const direction = movementFromNatural > 0 ? 1 :
      movementFromNatural < 0 ? -1 : 0;
    let newIndex = dragListIndex;
    if (direction !== 0) {
      const keyFn = this._getKeyFn();
      let reach = Math.abs(movementFromNatural);
      for (let i=dragListIndex+direction; i < list.length && i >= 0; i += direction) {
        const iDragHeight = this._getItemHeight(keyFn(list[i])).drag;
        if (reach < iDragHeight/2 + padding) break;
        reach -= iDragHeight + padding;
        newIndex = i;
      }
    }

    return newIndex;
  }

  _getVisualListDuringDrag(): ReadonlyArray<I> {
    const {list} = this.props;
    const {dragging, lastDrag} = this.state;
    if (!dragging || !lastDrag) throw new Error('Should not happen: _getVisualListDuringDrag called outside of drag');

    const dragListIndex = this._getDragListIndex();
    const dragVisualIndex = this._getDragVisualIndex();

    let newlist = list.concat();
    newlist.splice(dragListIndex, 1);
    newlist.splice(dragVisualIndex, 0, list[dragListIndex]);

    return newlist;
  }

  _getItemHeight(key: string): HeightData {
    return this.state.heights != null && key in this.state.heights ?
      this.state.heights[key] : DEFAULT_HEIGHT;
  }

  // Get the distance between the tops of two items in the list.
  // Does not consider how the dragged item may be rendered in a different position
  // unless you pass in the re-ordered list as a parameter.
  _getDistance(start: number, end: number, dragging: boolean, list: ReadonlyArray<I> = this.props.list): number {
    if (end < start) {
      return -this._getDistance(end, start, dragging, list);
    }

    const {padding} = this.props;
    const keyFn = this._getKeyFn();
    let distance = 0;
    for (let i=start; i < end; i++) {
      const height = this._getItemHeight(keyFn(list[i]));
      distance += (dragging ? height.drag : height.natural) + padding;
    }
    return distance;
  }

  _getDistanceFromTopDuringDrag(lastDrag: Drag, itemKey: string, visualList: ReadonlyArray<I>): number {
    const keyFn = this._getKeyFn();
    const index = DraggableList._getIndexOfItemWithKey(keyFn, visualList, itemKey);
    const dragListIndex = this._getDragListIndex();
    const dragVisualIndex = DraggableList._getIndexOfItemWithKey(keyFn, visualList, lastDrag.itemKey);

    let offset = 0;
    if (dragVisualIndex < dragListIndex) {
      const dragItemHeight = this._getItemHeight(lastDrag.itemKey);
      const newCenterHeight =
        this._getItemHeight(keyFn(visualList[dragListIndex]));
      offset = dragItemHeight.drag - newCenterHeight.drag;
    }

    return lastDrag.startY + offset +
      this._getDistance(dragListIndex, index, true, visualList);
  }

  _getContainer(): HTMLElement {
    const {container} = this.props;
    return container ? container() : null;
  }

  static _getKeyFn<I>(itemKey: string | ((item: I) => string)): (item: I) => string {
    return typeof itemKey === 'function' ? itemKey : (x: any) => x[itemKey];
  }

  _getKeyFn(): (item: I) => string {
    return DraggableList._getKeyFn<I>(this.props.itemKey);
  }

  render() {
    const {list, springConfig, padding, template, unsetZIndex, commonProps} = this.props;
    const {dragging, lastDrag, useAbsolutePositioning} = this.state;

    const keyFn = this._getKeyFn();
    const anySelected = spring(dragging ? 1 : 0, springConfig);

    const visualList = dragging ? this._getVisualListDuringDrag() : list;

    const children = list.map((item, i) => {
      const key = keyFn(item);
      const selectedStyle = dragging && lastDrag && lastDrag.itemKey === key
        ? {
          itemSelected: spring(1, springConfig),
          y: lastDrag.mouseY
        }
        : {
          itemSelected: spring(0, springConfig),
          y: (useAbsolutePositioning ? spring : (x: any, _: any)=>x)(dragging && lastDrag ?
            this._getDistanceFromTopDuringDrag(lastDrag, key, visualList) :
            this._getDistance(0, i, false), springConfig)
        };
      const style = {
        anySelected,
        ...selectedStyle
      };
      const makeDragHandleProps = (getY: ()=>number): Object => ({
        ref: (ref: HTMLElement) => {
          if (ref) {
            ref.addEventListener('touchstart', (e: TouchEvent) => this._handleTouchStart(key, getY(), e), {passive: false});
            ref.addEventListener('mousedown', (e: MouseEvent) => this._handleMouseDown(key, getY(), e));
          }
        }
      });
      const height = this._getItemHeight(key);
      return (
        <Motion
          style={style}
          key={key}
          onRest={() => {
            if (!dragging) {
              this.setState({
                heights: null,
                useAbsolutePositioning: false
              });
            }
          }}
          children={({itemSelected, anySelected, y}: {itemSelected: number, anySelected: number, y: number}) =>
            <MoveContainer
              ref={this._itemRefs.ref(key)}
              y={useAbsolutePositioning ? y : null}
              template={template}
              padding={padding}
              item={item}
              itemSelected={itemSelected}
              anySelected={anySelected}
              height={height}
              zIndex={unsetZIndex && !useAbsolutePositioning ? undefined :
                (lastDrag && lastDrag.itemKey === key ? list.length : i)
              }
              makeDragHandleProps={makeDragHandleProps}
              commonProps={commonProps}
            />
          }
        />
      );
    });


    const fullContainerHeight = useAbsolutePositioning ?
      `${this._getDistance(0, list.length, false)}px` :
      '0px';
    return (
      <div
        style={{position: 'relative'}}
        ref={this._listRef}
      >
        <div
          style={{
            display: useAbsolutePositioning ? 'block' : 'none',
            height: fullContainerHeight
          }}
        />
        {children}
      </div>
    );
  }
}