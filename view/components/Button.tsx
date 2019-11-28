import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  button: {
    display: 'inline-block',
    height: '36px',
    lineHeight: '36px',
    minWidth: '64px',
    margin: '0px',
    padding: '0px 10px',
    border: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: 600,
    outline: 'none',
    position: 'relative',
    borderRadius: '4px',
    userSelect: 'none',
    overflow: 'hidden',
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: 'inherit',
    '-webkit-tap-highlight-color': 'transparent',
    transition: 'background-color 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    '&:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    }
  },
  shadow: {
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
    }
  },
  primary: {
    color: '#003c8f',
    '&:active': {
      backgroundColor: 'rgba(21, 101, 192, 0.2)',
    }
  },
  disabled: {
    opacity: 0.7
  }
}

export interface IButtonProps {
  onClick?: React.MouseEventHandler;
  className?: string;
  shadow?: boolean;
  primary?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button: React.SFC<IButtonProps & WithStyles<typeof styles>> = ({classes, className, type, onClick, children, primary, shadow, disabled}) => (
  <button
    className={classNames(classes.button, shadow && classes.shadow, primary && classes.primary, disabled && classes.disabled, className)}
    onClick={onClick}
    type={type}
    disabled={disabled}
  >
    {children}
  </button>
)

export default injectSheet(styles)(Button)
