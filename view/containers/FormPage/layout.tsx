import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import { Styles } from 'jss';
import FormContainer from 'components/Form/FormContainer';
import TextFooter from 'components/TextFooter';

const styles: Styles = {
  root: {
    background: '#e3f2fd',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
    padding: '16px 16px'
  },
  container: {
    padding: 0
  },
  card: {
    marginTop: '100px',
    paddingTop: '24px',
    paddingRight: 30,
    paddingLeft: 30,
    background: '#fff',
    borderRadius: '4px',
    borderTop: '8px solid #22bff4',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    minHeight: '400px'
  },
  message: {
    margin: '8px',
    marginBottom: '64px',
    color: 'rgba(0,0,0,.6)',
    fontSize: '0.8em',
    fontWeight: 500
  },
  [`@media (max-width: 770px)`]: {
    card: {
      marginTop: '0px',
      paddingTop: '8px'
    }
  }
};

const FormLayout: React.SFC<WithStyles<typeof styles>> = ({classes, children}) => (
  <div className={classnames(classes.root)}>
    <FormContainer className={classes.container}>
      <div className={classes.card}>
        {children}
      </div>
      <p className={classes.message}>您提交的信息将会被安全的加密</p>
      <TextFooter>
        根据 <a href='https://www.gnu.org/licenses/agpl-3.0.html' target='_blank'>AGPL 许可证</a> 发布。Copyright © 2019 <a href='https://theform.app'>The Form</a>
      </TextFooter>
    </FormContainer>
    
  </div>
);

export default injectSheet(styles)(FormLayout);
