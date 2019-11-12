import React from 'react';
import FormLayout from 'components/Layout/FormLayout';
import Form from 'components/Form';
import { compose, Dispatch } from 'redux';
import injectReducer from 'utils/injectReducer';
import formPageReducer from './reducer';
import { createSelector } from 'reselect';
import { loadFormPage, submitFormPage, resetFormPage } from './actions';
import { makeSelectFormPageId, makeSelectFormPageLoadingError, makeSelectFormPageFormData, makeSelectFormPageLoading, makeSelectFormPageSubmiting, makeSelectFormPageSubmitingError, makeSelectFormPageSubmited } from './selectors';
import { $Call } from 'utils/types';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import formPageSaga from './saga';
import { IFormValue } from '@interface/Form';
import SubmitSuccessPage from './success';

interface IState {
  value: IFormValue
}

const mapStateToProps = createSelector(
  makeSelectFormPageId(),
  makeSelectFormPageFormData(),
  makeSelectFormPageLoading(),
  makeSelectFormPageLoadingError(),
  makeSelectFormPageSubmiting(),
  makeSelectFormPageSubmited(),
  makeSelectFormPageSubmitingError(),
  (id, form, loading, loadingError, submiting, submited, submitingError) => ({ id, form, loading, loadingError, submiting, submited, submitingError })
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onLoadFormPage: (id: string) => (dispatch(loadFormPage(id))),
  onSubmit: (value: IFormValue) => (dispatch(submitFormPage(value))),
  onReset: () => (dispatch(resetFormPage()))
});

interface IFormPageProps extends RouteComponentProps<{ id: string }> {
}


type stateProps = $Call<typeof mapStateToProps>;
type dispatchProps = $Call<typeof mapDispatchToProps>;

type Props = stateProps & dispatchProps & IFormPageProps;


class FormPage extends React.PureComponent<Props, IState> {

  state: IState = {
    value: {}
  }

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const { onLoadFormPage, match, id } = this.props;
    if (id === null || id !== match.params.id)
      onLoadFormPage(match.params.id);
  }

  handleChange = (value: IFormValue) => {
    this.setState({
      value: value
    });
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.value);
  }

  handleReset = () => {
    this.setState({
      value: {}
    })
    this.props.onReset()
  }

  render() {
    const { form, submited, submiting } = this.props;
    if (form) {
      const { template } = form;
      return <FormLayout>
        {
          !submited ?
            <Form
              onChange={this.handleChange}
              value={this.state.value}
              template={template}
              disabled={submiting}
              onSubmit={this.handleSubmit}
              submiting={submiting}
            />
            :
            <SubmitSuccessPage onClickReset={this.handleReset} />
        }
      </FormLayout>
    } else {
      return <></>
    }
  }
}

const withConnect = connect<stateProps, dispatchProps, IFormPageProps>(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'formPage', reducer: formPageReducer });
const withSage = injectSaga({ key: 'formPage', saga: formPageSaga })

export default compose(
  withReducer,
  withSage,
  withConnect
)(FormPage);