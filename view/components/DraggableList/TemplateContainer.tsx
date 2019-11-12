import React from 'react';

type Props<I,C,T> = {
  item: I;
  template: T;
  itemSelected: number;
  anySelected: number;
  dragHandleProps: Object;
  commonProps: C;
};

export default class TemplateContainer<I,C,T extends React.ComponentType<any>> extends React.Component<Props<I,C,T>> {
  _template: T;
  _templateSetter = (cmp: any) => {
    if (cmp) this._template = cmp;
  };

  shouldComponentUpdate(nextProps: Props<I,C,T>): boolean {
    return this.props.anySelected !== nextProps.anySelected ||
      this.props.itemSelected !== nextProps.itemSelected ||
      this.props.item !== nextProps.item ||
      this.props.template !== nextProps.template ||
      this.props.commonProps !== nextProps.commonProps;
  }

  getTemplate(): T {
    return this._template;
  }

  render() {
    const {item, itemSelected, anySelected, dragHandleProps, commonProps} = this.props;
    const Template = this.props.template as any;

    return (
      <Template
        ref={this._templateSetter}
        item={item}
        itemSelected={itemSelected}
        anySelected={anySelected}
        dragHandleProps={dragHandleProps}
        commonProps={commonProps}
      />
    );
  }
}