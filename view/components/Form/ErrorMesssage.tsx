import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  error: {
    margin: '16px 0',
    fontSize: '0.9em',
    lineHeight: 1.6,
    color: '#f44336'
  }
}

interface IErrorMessageProps {
  className?: string;
}

const ErrorMessage: React.SFC<IErrorMessageProps & WithStyles<typeof styles>> = ({classes, className, children}) => (
  <p className={classNames(classes.error, className)}>
    {children}
  </p>
)

export default injectSheet(styles)(ErrorMessage)
