import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import ResponsivePanel from "components/ResponsivePanel";
import TextInput from "components/Form/TextInput";
import { Styles } from "jss";
import FormAvatar from "components/FormAvatar";
import { createSelector } from 'reselect';
import { makeSelectEditorPageUnlocked, makeSelectEditorPageUnlockingError, makeSelectEditorPageFormTemplate, makeSelectEditorPageFormDate } from './selectors';
import { $Call } from 'utils/types';
import { unlockEditorPage } from './actions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IUnlockDialogState {
  password: string;
  edited: boolean;
}

const styles: Styles = {
  '@keyframes errorAnimaion': {
    from: {transform: 'translateX(-20px)'},
    to: {transform: 'translateX(20px)'}
  },
  section: {
    padding: '12px 24px'
  },
  errorSection: {
    animationName: '$errorAnimaion',
    animationDuration: '0.1s',
    animationIterationCount: 2,
    animationTimingFunction: 'linear'
  },
  sectionHeader: {
    paddingTop: '16px',
    paddingBottom: '8px',
    fontSize: '15px'
  }
};

const mapStateToProps = createSelector(
  makeSelectEditorPageFormDate(),
  makeSelectEditorPageFormTemplate(),
  makeSelectEditorPageUnlocked(),
  makeSelectEditorPageUnlockingError(),
  (date, template, unlocked, error) => ({ date, template, unlocked, error })
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onUnlockEditorPage: (password: string) => (dispatch(unlockEditorPage(password)))
});

interface IUnlockDialogProps {
}

type stateProps = $Call<typeof mapStateToProps>;
type dispatchProps = $Call<typeof mapDispatchToProps>;

type IProps = stateProps & dispatchProps & IUnlockDialogProps & WithStyles<typeof styles>;

class UnlockDialog extends React.PureComponent<IProps, IUnlockDialogState> {
  state = {
    password: '',
    edited: false
  }

  handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      password: event.target.value,
      edited: true
    })
  }

  handleSubmit = () => {
    this.props.onUnlockEditorPage(this.state.password);
    this.setState({
      edited: false
    });
  }

  render() {
    const { date, template, classes, error } = this.props;
    const { edited, password } = this.state;
    return <ResponsivePanel
      onSubmit={this.handleSubmit}
      title='请输入密码'
      submitLabel='确定'
      bodyClassName={!edited && error && classes.errorSection}
    >
      <FormAvatar className={classes.section} title={template.title} date={date} />
      <section className={classes.section}>
        <h5 className={classes.sectionHeader}>请输入表单密码：</h5>
        <TextInput placeholder='表单密码' type='password' value={password} onChange={this.handlePasswordChange} error={!edited && error} autoFocus focus={error}></TextInput>
      </section>
    </ResponsivePanel>
  }
}

const withConnect = connect<stateProps, dispatchProps, IUnlockDialogProps>(mapStateToProps, mapDispatchToProps);

const withStyle = injectSheet(styles);

export default withConnect(withStyle(UnlockDialog));
