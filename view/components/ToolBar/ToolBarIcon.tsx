import React from 'react';
import { ISvgIconProps } from '../icons/SvgIcon';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';

interface IToolBarIconProps {
  className?: string;
  icon: (props: ISvgIconProps) => JSX.Element;
  onClick?: React.MouseEventHandler;
}

const styles: Styles = {
  icon: {
    height: '36px',
    padding: '6px'
  }
}

const ToolBarIcon: React.SFC<IToolBarIconProps & WithStyles<typeof styles>> = ({icon: Icon, onClick, className, classes}) => (
  <Icon className={classNames(classes.icon, className)} onClick={onClick} />
);

export default injectSheet(styles)(ToolBarIcon);