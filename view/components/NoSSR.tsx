import React from 'react';

const DefaultOnSSR = () => (<></>);

interface INoSSRProps {
  onSSR?: React.ReactNode;
}

class NoSSR extends React.Component<INoSSRProps> {
  state = {
    canRender: false
  };

  componentDidMount() {
    this.setState({ canRender: true });
  }

  render() {
    const { children, onSSR = <DefaultOnSSR />} = this.props;
    const { canRender } = this.state;

    return canRender ? children : onSSR;
  }
}

export default NoSSR;
