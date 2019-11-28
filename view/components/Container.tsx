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
    maxWidth: 1150
  },
  [`@media (max-width: 1400px)`]: {
    container: {
      maxWidth: 920
    }
  },
  [`@media (max-width: 1100px)`]: {
    container: {
      maxWidth: 690,
      paddingRight: 24,
      paddingLeft: 24
    }
  }
};

const Container: React.SFC<WithStyles<typeof styles> & {className?: string, style?: React.CSSProperties}> = ({className, classes, style, children}) => (
  <div style={style} className={classnames(classes.container, className)}>
    {children}
  </div>
);

export default injectSheet(styles)(Container);
