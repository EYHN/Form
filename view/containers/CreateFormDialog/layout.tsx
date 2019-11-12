import React from 'react';
import ResponsivePanel from 'components/ResponsivePanel';
import { Styles } from 'jss';
import injectSheet, { WithStyles } from 'react-jss';
import FormAvatar from 'components/FormAvatar';
import TextInput from 'components/Form/TextInput';
import Asterisk from 'components/Asterisk';

const styles: Styles = {
  '@keyframes errorAnimaion': {
    from: {transform: 'translateX(-20px)'},
    to: {transform: 'translateX(20px)'}
  },
  errorSection: {
    animationName: '$errorAnimaion',
    animationDuration: '0.1s',
    animationIterationCount: 2,
    animationTimingFunction: 'linear'
  },
  section: {
    padding: '6px 24px'
  },
  sectionHeader: {
    marginTop: '16px',
    marginBottom: '8px',
    lineHeight: 1
  },
  sectionItem: {
    marginTop: '12px',
    marginBottom: '8px'
  },
  sectionTip: {
    fontSize: '0.85rem',
    color: '#333',
    marginTop: '8px',
    marginBottom: '16px',
  },
  errorMessage: {
    fontSize: '0.85rem',
    color: '#b00020',
    marginTop: '8px',
    marginBottom: '16px',
  }
};

interface ICreateFormDialogLayoutProps {
  title: string;
  password: string;
  confirmPassword: string;
  date: string;
  error: boolean;
  errorMessage: string;
  onClose?: () => void;
  onSubmit?: () => void;
  onTitleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirmPasswordChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

class CreateFormDialogLayout extends React.PureComponent<ICreateFormDialogLayoutProps & WithStyles<typeof styles>> {
  render() {
    const {title, password, confirmPassword, date, error, errorMessage, onClose, onSubmit, onTitleChange, onPasswordChange, onConfirmPasswordChange, classes} = this.props;
    return <ResponsivePanel
      onClose={onClose}
      onSubmit={onSubmit}
      title='创建新表单'
      submitLabel='创建'
      bodyClassName={error && classes.errorSection}
      form
    >
      <FormAvatar className={classes.section} title={title || '未命名表单'} date={date} />
      <section className={classes.section}>
        <h5 className={classes.sectionHeader}>表单标题：</h5>
        <TextInput autoComplete='off' placeholder='未命名表单' className={classes.sectionItem} value={title} onChange={onTitleChange}></TextInput>
      </section>
      <section className={classes.section}>
        <h5 className={classes.sectionHeader}>表单密码： <Asterisk /></h5>
        <p className={classes.sectionTip}>编辑表单时需要输入表单密码</p>
        <TextInput
          autoComplete='new-password'
          placeholder='表单密码'
          type='password'
          className={classes.sectionItem}
          value={password} 
          onChange={onPasswordChange}
          error={error}
        />
        <TextInput
          autoComplete='new-password'
          placeholder='确认一遍你的表单密码'
          type='password'
          className={classes.sectionItem}
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          error={error}
        />
        {error && <span className={classes.errorMessage}>{errorMessage}</span>}
      </section>
    </ResponsivePanel>
  }
}

export default injectSheet(styles)(CreateFormDialogLayout);
