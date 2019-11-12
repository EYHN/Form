import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';

const styles = {
  container: {
    width: '100%',
    paddingRight: 30,
    paddingLeft: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    maxWidth: 770
  },
  [`@media (max-width: 770px)`]: {
    container: {
      paddingRight: 24,
      paddingLeft: 24,
    }
  }
};

const Container: React.SFC<WithStyles<typeof styles> & {className: string}> = ({className, classes, children}) => (
  <div className={classnames(classes.container, className)}>
    {children}
  </div>
);

export default injectSheet(styles)(Container);
