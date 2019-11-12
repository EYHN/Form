import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import GoogleFormLogo from './icons/GoogleFormLogo';
import { Styles } from 'jss';
import Lock from './icons/Lock';

const styles: Styles = {
  formAvatar: {
    display: 'flex'
  },
  formLogo: {
    boxSizing: 'content-box',
    width: 56,
    height: 56,
    background: '#e8e8e8',
    padding: '20px'
  },
  formInfoMessages: {
    marginLeft: '24px',
    fontSize: '0.95rem',
    marginTop: '6px'
  },
  formInfoSubMessages: {
    color: '#545454'
  }
};

interface IFormAvatarProps {
  className?: string;
  title: React.ReactNode;
  date: string;
}

const FormAvatar: React.SFC<WithStyles<typeof styles> & IFormAvatarProps> = ({className, classes, title, date}) => (
  <section className={classNames(classes.formAvatar, className)}>
    <GoogleFormLogo className={classes.formLogo} />
    <div className={classes.formInfoMessages}>
      <h5>{title}</h5>
      <span className={classes.formInfoSubMessages}>加密表单<Lock width='16px' /><br/>
      {date && `于${new Date(date).toLocaleDateString('zh-cn')}创建`}</span>
    </div>
  </section>
);

export default injectSheet(styles)(FormAvatar);
