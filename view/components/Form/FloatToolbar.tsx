import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import debounce from 'utils/debounce';
import { Styles } from 'jss';

interface IFloatToolbarProps {
  className: string,
  targetElement: HTMLElement
}

const toolbarHeight = 120;

const moblieBreakpoints = 910;

const styles: Styles = {
  root: {
    position: 'relative',
    width: '46px'
  },
  floatContianer: {
    position: 'fixed',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '90%',
    maxWidth: '500px',
    padding: '6px 0',
    minHeight: '32px',
    left: '50%',
    bottom: 0,
    transform: 'translateX(-50%)',
    background: '#fff',
    boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
    borderRadius: '2px'
  },
  [`@media (min-width: ${moblieBreakpoints}px)`]: {
    floatContianer: {
      position: 'absolute',
      flexDirection: 'column',
      width: '46px',
      height: toolbarHeight,
      top: 0,
      left: 0,
      bottom: 'auto',
      transform: 'translateY(0px)',
      willChange: 'transform',
      transition: 'transform .3s cubic-bezier(0.4,0.0,0.2,1)'
    }
  }
};

interface IState {
  moblie: boolean;
  top: number;
}

class FloatToolbar extends React.PureComponent<IFloatToolbarProps & WithStyles<typeof styles>, IState> {
  animationFrameRequest: number;
  rootElement: HTMLDivElement;

  state: IState = {
    moblie: false,
    top: 0
  };

  computeTop() {
    if (this.rootElement && this.props.targetElement) {
      const windowHeight = window.innerHeight;
      const targetClientRects = this.props.targetElement.getClientRects()[0]
      if (targetClientRects.top < 0) {
        return - this.rootElement.getClientRects()[0].top;
      } else if (windowHeight < targetClientRects.top + toolbarHeight) {
        return - this.rootElement.getClientRects()[0].top + windowHeight - toolbarHeight
      } else {
        return targetClientRects.top - this.rootElement.getClientRects()[0].top;
      }
    }
    return 0;
  }

  handleWindowResize = () => {
    this.setState({
      moblie: window.innerWidth < moblieBreakpoints
    });
  }

  prevTop = 0;
  debouncedUpdate = debounce((top: number) => {
    this.setState({
      top: top
    });
  }, 50, true);
  update = () => {
    if (this.state.moblie) {
      this.debouncedUpdate.cancel();
      return;
    }
    const top = this.computeTop();
    if (top != this.prevTop) {
      this.debouncedUpdate(top);
      this.prevTop = top;
    }
    this.animationFrameRequest = requestAnimationFrame(this.update);
  };

  componentDidMount() {
    this.update();
    this.handleWindowResize();
    window.addEventListener('resize', this.handleWindowResize)
  }

  componentDidUpdate(_: IFloatToolbarProps, prevState: IState) {
    if (prevState.moblie === true && this.state.moblie === false) {
      cancelAnimationFrame(this.animationFrameRequest);
      this.update();
    }
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrameRequest);
    window.removeEventListener('resize', this.handleWindowResize)
  }

  render() {
    const { classes, className, children } = this.props;
    return <div ref={ref => this.rootElement = ref} className={classNames(classes.root, className)}>
      <div className={classes.floatContianer} style={{transform: !this.state.moblie && `translateY(${this.state.top}px)`}}>
        {children}
      </div>
    </div>
  }
}

export default injectSheet(styles)(FloatToolbar);
