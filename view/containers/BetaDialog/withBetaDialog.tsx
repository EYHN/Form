import React from 'react';
import BetaDialog from '.';
import NoSSR from 'components/NoSSR';

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
      <NoSSR>
        {this.state.open && <BetaDialog onClose={this.handleClose} />}
      </NoSSR>
      {children}
    </>
  }
}