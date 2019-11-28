import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import Button, { IButtonProps } from 'components/Button';
import { Styles } from 'jss';

interface IToolBarButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler;
}

const styles: Styles = {
  button: {
    height: '36px',
    minWidth: '82px',
    margin: '0 6px',
    background: '#1565c0',
    fontSize: "0.9em",
    fontWeight: 500,
    color: '#fff',
    '&:active': {
      backgroundColor: 'rgba(21, 101, 192, 0.8)',
    }
  }
}

const ToolBarButton: React.SFC<IToolBarButtonProps & WithStyles<typeof styles> & IButtonProps> = ({className, children, classes, ...props}) => (
  <Button className={classNames(classes.button)} shadow {...props}>{children}</Button>
);

export default injectSheet(styles)(ToolBarButton);