import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  container: {
    marginTop: '40px',
    marginBottom: '320px'
  },
  title: {
    fontSize: '2.4rem',
    marginBottom: '12px',
    fontWeight: 'normal'
  },
  text: {
    fontSize: '1rem',
    marginTop: '12px',
    color: 'rgba(0,0,0,.6)'
  },
  link: {
    color: 'rgb(33, 150, 243)',
    cursor: 'pointer',
    borderBottom: '1px solid'
  }
};

interface ISubmitSuccessPageProps {
  onClickReset?: React.MouseEventHandler;
  className?: string;
}

const SubmitSuccessPage: React.SFC<ISubmitSuccessPageProps & WithStyles<typeof styles>> = ({onClickReset, className, classes}) => (
  <div className={classnames(classes.container, className)}>
    <h1 className={classes.title}>感谢您的填写</h1>
    <p className={classes.text}>
      您表单已成功提交。
    </p>

    <br/>

    <p className={classes.text}>
      <a className={classes.link} onClick={onClickReset}>
        再次填写表单
      </a>
    </p>
  </div>
);

export default injectSheet(styles)(SubmitSuccessPage);
