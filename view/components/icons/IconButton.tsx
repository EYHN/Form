import React from 'react';
import { ISvgIconProps } from "./SvgIcon";

export interface IIconButtonProps {
  icon: (props: ISvgIconProps) => JSX.Element;
  className?: string;
  color?: string;
  size?: number;
  onClick?: React.MouseEventHandler;
  disabled?: boolean
  disabledColor?: string;
}

const IconButton: React.SFC<IIconButtonProps> = ({icon: Icon, className, color = '#767676', size = 24, onClick, disabled, disabledColor = '#ccc'}) => 
  <Icon
    color={disabled ? disabledColor : color}
    className={className}
    style={{cursor: disabled ? 'default' : 'pointer', color: disabled ? disabledColor : color}}
    height={size}
    onClick={!disabled ? onClick : null}
    role='button'
  />;

export default IconButton;