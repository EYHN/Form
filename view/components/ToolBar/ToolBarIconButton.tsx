import React from 'react';
import { ISvgIconProps } from '../icons/SvgIcon';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';
import IconButton, { IIconButtonProps } from 'components/icons/IconButton';

interface IToolBarIconProps {
  className?: string;
  icon: (props: ISvgIconProps) => JSX.Element;
  onClick?: React.MouseEventHandler;
}

const styles: Styles = {
  icon: {
    height: '36px',
    padding: '6px'
  },
  button: {
    cursor: 'pointer'
  }
}

const ToolBarIconButton: React.SFC<IToolBarIconProps & WithStyles<typeof styles> & IIconButtonProps> = ({icon, onClick, className, classes, ...props}) => (
  <IconButton icon={icon} className={classNames(classes.icon, classes.button, className)} onClick={onClick} {...props} />
);

export default injectSheet(styles)(ToolBarIconButton);