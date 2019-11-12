import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';

const styles = {
  asterisk: {
    color: '#db4437'
  }
}

const Asterisk: React.SFC<{className?: string} & WithStyles<typeof styles>> = ({classes, className, children}) => (
  <span className={classNames(classes.asterisk, className)}>
    *
    {children && <span>{children}</span>}
  </span>
)

export default injectSheet(styles)(Asterisk)
