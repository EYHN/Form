import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';
import Button from 'components/Button';

const styles: Styles = {
  submitButton: {
    minWidth: '120px',
    background: '#1976d2',
    color: '#fff'
  }
}

interface ISubmitButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler;
}

const SubmitButton: React.SFC<ISubmitButtonProps & WithStyles<typeof styles>> = ({classes, onClick, className, children}) => (
  <Button type="button" shadow primary onClick={onClick} className={classNames(classes.submitButton, className)}>
    {children}
  </Button>
)

export default injectSheet(styles)(SubmitButton)
