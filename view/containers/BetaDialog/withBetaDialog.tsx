import React from 'react';
import BetaDialog from '.';

export default class WithBetaDialog extends React.PureComponent<{}, {open: boolean}> {
  state = {
    open: true
  }
  
  handleClose = () => {
    this.setState({open: false});
  }

  render() {
    const {children} = this.props;
    return <>
      {this.state.open && <BetaDialog onClose={this.handleClose} />}
      {children}
    </>
  }
}