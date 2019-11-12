import React from 'react';

interface IProps {
  className?: string;
  component?: React.ReactType<{ ref: React.Ref<any>, style: React.CSSProperties, className: string }> | string;
  style?: React.CSSProperties;
  children?: (hover: boolean) => React.ReactNode;
}

interface IState {
  hover: boolean;
}

export default class Hover extends React.PureComponent<IProps, IState> {
  state = {
    hover: false
  };

  element: HTMLElement;

  handleComponentRef = (element: HTMLElement) => {
    if (!element) return;
    this.element = element;
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
  }

  handleMouseEnter = () => {
    this.setState({
      hover: true
    });
  };

  handleMouseLeave = () => {
    this.setState({
      hover: false
    });
  };

  render() {
    const {component: Component = 'div', style, className, children} = this.props;
    return <Component ref={this.handleComponentRef} style={style} className={className}>
        {children(this.state.hover)}
      </Component>;
  }
}