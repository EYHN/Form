import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import Container from 'components/Container';
import { Styles } from 'jss';

const styles: Styles = {
  root: {
    background: '#e3f2fd',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden',
    padding: '16px 16px'
  },
  card: {
    marginTop: '100px',
    marginBottom: '64px',
    paddingTop: '24px',
    paddingBottom: '32px',
    background: '#fff',
    borderTop: '8px solid #22bff4',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    minHeight: '400px'
  },
  [`@media (max-width: 770px)`]: {
    card: {
      marginTop: '0px',
      paddingTop: '8px',
      paddingBottom: '24px'
    }
  }
};

const FormLayout: React.SFC<WithStyles<typeof styles>> = ({classes, children}) => (
  <div className={classnames(classes.root)}>
    <Container className={classnames(classes.card)}>
      {children}
    </Container>
  </div>
);

export default injectSheet(styles)(FormLayout);
