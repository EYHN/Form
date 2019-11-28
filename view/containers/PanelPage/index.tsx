import React from 'react';
import { RouteComponentProps } from 'react-router';
import PanelLayout from './Layout';
import CreateFormDialog from 'containers/CreateFormDialog';
import { makeSelectForms } from './selectors';
import { createSelector } from 'reselect';
import { compose, Dispatch } from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import panelPageReducer from './reducer';
import panelPageSaga from './saga';
import { deleteSavedForms, loadPanelPage } from './actions';
import { IForm } from '@interface/Form';
import Helmet from './Helmet';

interface IState {
  createDialog: boolean;
  searchText: string;
}

interface IPanelPageProps extends RouteComponentProps {
}

const mapStateToProps = createSelector(
  makeSelectForms(),
  (forms) => ({ forms })
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteForm: (id: string) => dispatch(deleteSavedForms(id)),
  loadPanelPage: () => dispatch(loadPanelPage())
});

type stateProps = ReturnType<typeof mapStateToProps>;
type dispatchProps = ReturnType<typeof mapDispatchToProps>;

type Props = stateProps & dispatchProps & IPanelPageProps;

class PanelPage extends React.PureComponent<Props, IState> {
  state = {
    createDialog: false,
    searchText: ''
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadPanelPage();
  }

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

  handleSelectForm = (id: string) => {
    this.props.history.push('/editor/' + id);
  }

  handleDeleteForm = (id: string) => {
    this.props.deleteForm(id);
  }

  handleSearch = (search: string) => {
    this.setState({
      searchText: search
    });
  }

  doSearch = (forms: IForm[], search: string) => {
    if (search)
      return forms.filter(form =>
        (form.template.title || '').includes(search) || (form.template.description || '').includes(search)
      );
    else
      return forms;
  }

  render() {
    const { forms } = this.props;
    return (
      <>
        <Helmet />
        <PanelLayout
          onDeleteForm={this.handleDeleteForm}
          onSelectForm={this.handleSelectForm}
          onClickNewForm={this.handleOpenCreateDialog}
          onSearch={this.handleSearch}
          searchText={this.state.searchText}
          forms={this.doSearch(forms, this.state.searchText)}
        />
        {
          this.state.createDialog && <CreateFormDialog onClose={this.handleCloseCreateDialog} />
        }
      </>
    );
  }
}

const withConnect = connect<stateProps, dispatchProps, IPanelPageProps>(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'panelPage', reducer: panelPageReducer });
const withSage = injectSaga({ key: 'panelPage', saga: panelPageSaga });

export default compose(
  withReducer,
  withSage,
  withConnect
)(PanelPage);
