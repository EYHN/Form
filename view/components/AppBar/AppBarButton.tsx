import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import Button, { IButtonProps } from 'components/Button';
import { Styles } from 'jss';

interface IAppBarButtonProps {
  className?: string;
  onClick?: React.MouseEventHandler;
}

const styles: Styles = {
  button: {
    height: '48px',
    minWidth: '64px',
    fontWeight: 500,
    fontSize: '0.9em'
  }
}

const AppBarButton: React.SFC<IAppBarButtonProps & WithStyles<typeof styles> & IButtonProps> = ({className, children, classes, ...props}) => (
  <Button className={classNames(className, classes.button)} {...props}>{children}</Button>
);

export default injectSheet(styles)(AppBarButton);