import React from 'react';
import { ISvgIconProps } from '../icons/SvgIcon';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import AppBarIcon from './AppBarIcon';
import { Styles } from 'jss';

interface IAppBarIconProps {
  className?: string;
  icon: (props: ISvgIconProps) => JSX.Element;
  onClick?: React.MouseEventHandler;
}

const styles: Styles = {
  button: {
    cursor: 'pointer'
  }
}

const AppBarIconButton: React.SFC<IAppBarIconProps & WithStyles<typeof styles>> = ({icon, onClick, className, classes}) => (
  <AppBarIcon icon={icon} className={classNames(classes.button, className)} onClick={onClick} />
);

export default injectSheet(styles)(AppBarIconButton);