import React from 'react';
import { RouteComponentProps } from 'react-router';
import HomeLayout from 'components/Layout/HomeLayout';
import CreateFormDialog from 'containers/CreateFormDialog';
import Helmet from './Helmet';

interface IState {
  createDialog: boolean;
}

interface IHomePageProps extends RouteComponentProps {
}

class HomePage extends React.PureComponent<IHomePageProps, IState> {
  state = {
    createDialog: false
  };

  handleOpenCreateDialog = () => {
    this.setState({
      createDialog: true
    });
  }

  handleCloseCreateDialog = () => {
    this.setState({
      createDialog: false
    });
  }

  render() {
    return (
      <>
        <Helmet />
        <HomeLayout
          onClickNewForm={this.handleOpenCreateDialog}
        >
          {
            this.state.createDialog && <CreateFormDialog onClose={this.handleCloseCreateDialog} />
          }
        </HomeLayout>
      </>
    );
  }
}

export default HomePage;