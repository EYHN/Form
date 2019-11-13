import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';
import Button, { IButtonProps } from 'components/Button';

const styles: Styles = {
  submitButton: {
    minWidth: '120px',
    background: '#1976d2',
    color: '#fff'
  }
}

interface ISubmitButtonProps {
  className?: string;
}

const SubmitButton: React.SFC<ISubmitButtonProps & WithStyles<typeof styles> & IButtonProps> = ({classes, className, children, ...props}) => (
  <Button type="button" shadow primary className={classNames(classes.submitButton, className)} {...props}>
    {children}
  </Button>
)

export default injectSheet(styles)(SubmitButton)
