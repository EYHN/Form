import React from 'react';
import { ISvgIconProps } from '../icons/SvgIcon';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';

interface IAppBarIconProps {
  className?: string;
  icon: (props: ISvgIconProps) => JSX.Element;
  onClick?: React.MouseEventHandler;
}

const styles: Styles = {
  icon: {
    height: '48px',
    padding: '12px'
  }
}

const AppBarIcon: React.SFC<IAppBarIconProps & WithStyles<typeof styles>> = ({icon: Icon, onClick, className, classes}) => (
  <Icon className={classNames(className, classes.icon)} onClick={onClick} />
);

export default injectSheet(styles)(AppBarIcon);