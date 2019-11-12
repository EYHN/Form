import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  checkbox: {
    display: 'inline-block',
    position: 'relative',
    width: '18px',
    height: '18px',
    verticalAlign: 'bottom'
  },
  native: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    margin: '0',
    padding: '0',
    opacity: 0,
    cursor: 'inherit',
    '&:disabled': {
      pointerEvents: 'none'
    }
  },
  background: {
    left: '0',
    right: 'auto',
    display: 'inline-flex',
    position: 'absolute',
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    transition: 'background-color 125ms cubic-bezier(.4,0,.6,1), border-color 125ms cubic-bezier(.4,0,.6,1)',
    border: '2px solid #777777',
    borderRadius: '3px',
    backgroundColor: 'transparent',
    pointerEvents: 'none',
    willChange: 'background-color, border-color',
    '&>svg': {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: '0.5px',
      transition: 'opacity 250ms cubic-bezier(.4,0,.6,1)',
      opacity: 0,
      '&>path': {
        transition: 'stroke-dashoffset 250ms cubic-bezier(.4,0,.6,1)',
        stroke: '#fff',
        strokeDashoffset: 29.78334,
        strokeDasharray: 29.78334,
        strokeWidth: '3.12px',
      }
    }
  },
  checkedBackground: {
    borderColor: '#2196f3',
    backgroundColor: '#2196f3',
    '&>svg': {
      opacity: 1,
      '&>path': {
        strokeDashoffset: 0
      }
    }
  },
  disabledBackground: {
    borderColor: '#bdbdbd',
    backgroundColor: 'transparent',
    '&>svg': {
      opacity: 0,
      '&>path': {
        strokeDashoffset: 29.78334,
      }
    }
  }
}

interface ISelectionProps {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const Checkbox: React.SFC<ISelectionProps & WithStyles<typeof styles>> = ({classes, disabled, className, checked, onClick}) => (
  <div className={classNames(classes.checkbox, className)}>
    <input 
      type='checkbox'
      disabled={disabled}
      className={classes.native}
      checked={checked}
      readOnly={typeof onClick === 'function'}
      onClick={onClick}
    />
    <div className={classNames(classes.background, checked && classes.checkedBackground, disabled && classes.disabledBackground)}>
      <svg className={classes.checkbox}
           viewBox="0 0 24 24">
        <path fill="none"
              d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
      </svg>
    </div>
  </div>
)

export default injectSheet(styles)(Checkbox)
