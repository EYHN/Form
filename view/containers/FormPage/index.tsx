import React from 'react';
import FormLayout from 'components/Layout/FormLayout';
import Form from 'components/Form';
import { compose, Dispatch } from 'redux';
import injectReducer from 'utils/injectReducer';
import formPageReducer from './reducer';
import { createSelector } from 'reselect';
import { loadFormPage, submitFormPage, resetFormPage } from './actions';
import { makeSelectFormPageId, makeSelectFormPageLoadingError, makeSelectFormPageFormData, makeSelectFormPageLoading, makeSelectFormPageSubmitting, makeSelectFormPageSubmittingError, makeSelectFormPageSubmited } from './selectors';
import { $Call } from 'utils/types';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import formPageSaga from './saga';
import { IFormValue, IFormMeta } from '@interface/Form';
import SubmitSuccessPage from './success';
import { validate } from 'validate';

interface IState {
  values: IFormValue;
  metas: IFormMeta;
}

const mapStateToProps = createSelector(
  makeSelectFormPageId(),
  makeSelectFormPageFormData(),
  makeSelectFormPageLoading(),
  makeSelectFormPageLoadingError(),
  makeSelectFormPageSubmitting(),
  makeSelectFormPageSubmited(),
  makeSelectFormPageSubmittingError(),
  (id, form, loading, loadingError, submitting, submited, submittingError) => ({ id, form, loading, loadingError, submitting, submited, submittingError })
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
    values: {},
    metas: {}
  }

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const { onLoadFormPage, match, id } = this.props;
    if (id === null || id !== match.params.id)
      onLoadFormPage(match.params.id);
  }

  handleChange = (id: string, value: any) => {
    this.setState((state) => ({
      values: {
        ...state,
        [id]: value
      }
    }));
  }

  clearError = (id: string) => {
    if (this.state.metas[id] && this.state.metas[id].error) {
      this.setState((state) => ({
        metas: {
          ...state.metas,
          [id]: {error: null}
        }
      }));
    }
  }

  validateSingle = (id: string, value: any) => {
    const index = this.props.form.template.form.findIndex(item => item.id === id);
    const item = this.props.form.template.form[index];
    const err = validate(item, value);
    if (err) {
      this.setState((state) => ({
        metas: {
          ...state.metas,
          [id]: {error: err}
        }
      }));
      return true;
    }
  }

  validateAll = () => {
    const formitems = this.props.form.template.form;
    const values = this.state.values;
    const metas: IFormMeta = {};
    let isError = false;
    formitems.forEach((item) => {
      const v = values[item.id];
      const err = validate(item, v);
      if (err) {
        isError = true;
        metas[item.id] = {
          error: err
        };
      }
    })
    if (isError) {
      this.setState({
        metas: metas
      });
      return true;
    }
  }

  handleSubmit = () => {
    if (this.validateAll()) return;
    this.props.onSubmit(this.state.values);
  }

  handleReset = () => {
    this.setState({
      values: {}
    })
    this.props.onReset()
  }

  render() {
    const { form, submited, submitting } = this.props;
    if (form) {
      const { template } = form;
      return <FormLayout>
        {
          !submited ?
            <Form
              values={this.state.values}
              metas={this.state.metas}
              template={template}
              disabled={submitting}
              onSubmit={this.handleSubmit}
              onItemChange={this.handleChange}
              onItemBlurring={this.validateSingle}
              onItemChanging={this.clearError}
              submitting={submitting}
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