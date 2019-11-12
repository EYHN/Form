import React from 'react';
import { RouteComponentProps } from 'react-router';
import AppBarTitle from 'components/AppBar/AppBarTitle';
import HomeLayout from 'components/Layout/HomeLayout';
import AppBarButton from 'components/AppBar/AppBarButton';
import CreateFormDialog from 'containers/CreateFormDialog';

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
      <HomeLayout
        onClickNewForm={this.handleOpenCreateDialog}
        appbarleft={
          <>
            <AppBarTitle>The Form</AppBarTitle>
          </>
        }
        appbarright={
          <>
            <AppBarButton>博客</AppBarButton>
            <AppBarButton>支持</AppBarButton>
            <AppBarButton>关于</AppBarButton>
          </>
        }
      >
        {
          this.state.createDialog && <CreateFormDialog onClose={this.handleCloseCreateDialog} />
        }
      </HomeLayout>
    );
  }
}

export default HomePage;