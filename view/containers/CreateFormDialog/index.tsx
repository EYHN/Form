import React from 'react';
import { IFormTemplate } from '@interface/Form';
import { Dispatch, compose } from 'redux';
import { $Call } from 'utils/types';
import { makeSelectCreateFormDialogError, makeSelectCreateFormDialogCreating } from './selectors';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import createFormDialogReducer from './reducer';
import createFormDialogSaga from './saga';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import CreateFormDialogLayout from './layout';
import { createNewForm, clearNewFormState } from './actions';

interface IState {
  title: string;
  password: string;
  confirmPassword: string;
  error: boolean;
  errorMessage: string;
}

const mapStateToProps = createSelector(
  makeSelectCreateFormDialogCreating(),
  makeSelectCreateFormDialogError(),
  (creating, error) => ({ creating, error })
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onCreateNewForm: (template: IFormTemplate, password: string) => (dispatch(createNewForm({ template, password }))),
  onClearState: () => (dispatch(clearNewFormState())),
});

interface ICreateFormDialogProps {
  onClose?: () => void;
}

type stateProps = $Call<typeof mapStateToProps>;
type dispatchProps = $Call<typeof mapDispatchToProps>;

type Props = stateProps & dispatchProps & ICreateFormDialogProps;

class CreateFormDialog extends React.PureComponent<Props, IState> {
  state = {
    title: '',
    password: '',
    confirmPassword: '',
    error: false,
    date: new Date().toUTCString(),
    errorMessage: ''
  };

  componentWillUnmount() {
    this.props.onClearState();
  }

  handleOnTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      title: e.target.value,
      error: false
    });
  }

  handleOnPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      password: e.target.value,
      error: false
    });
  }

  handleOnConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({
      confirmPassword: e.target.value,
      error: false
    });
  }

  handleOnCreate = (title: string, password: string) => {
    const template: IFormTemplate = {
      title,
      form: [
        {
          type: "SingleSelection",
          id: "1",
          title: "新问题",
          choices: [{
            type: "text",
            text: "选项 1"
          }]
        }
      ]
    };
    this.props.onCreateNewForm(template, password);
  }

  handleOnSubmit = () => {
    if (this.state.password.length === 0)
    this.setState({
      error: true,
      errorMessage: '请输入密码'
    });

    else if (this.state.password !== this.state.confirmPassword)
    this.setState({
      error: true,
      errorMessage: '2次密码输入不一致'
    });

    else if (this.state.password.length < 6)
    this.setState({
      error: true,
      errorMessage: '密码长度过短'
    });

    else 
    this.handleOnCreate(this.state.title, this.state.password);
  }

  render() {
    const { onClose } = this.props;
    const { title, password, confirmPassword, date, error, errorMessage } = this.state;
    return <CreateFormDialogLayout
      title={title}
      password={password}
      confirmPassword={confirmPassword}
      date={date}
      error={error}
      errorMessage={errorMessage}
      onClose={onClose}
      onSubmit={this.handleOnSubmit}
      onConfirmPasswordChange={this.handleOnConfirmPasswordChange}
      onPasswordChange={this.handleOnPasswordChange}
      onTitleChange={this.handleOnTitleChange}
    />
  }
}

const withConnect = connect<stateProps, dispatchProps, ICreateFormDialogProps>(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'createFormDialog', reducer: createFormDialogReducer });
const withSage = injectSaga({ key: 'createFormDialog', saga: createFormDialogSaga })

export default compose<React.ComponentClass<ICreateFormDialogProps>>(
  withReducer,
  withSage,
  withConnect
)(CreateFormDialog);
