import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  radio: {
    width: '18px',
    height: '18px',
    appearance: 'none',
    borderRadius: '50%',
    border: '2px solid #777777',
    transition: '125ms border cubic-bezier(.4,0,.6,1)',
    outline: 'none',
    cursor: 'pointer',
    verticalAlign: 'bottom',
    willChange: 'border',
    '&:disabled': {
      border: '2px solid #bdbdbd',
      pointerEvents: 'none'
    },
    '&:checked': {
      border: '6px solid #2196f3'
    },
    fallbacks: {
      '-webkit-appearance': 'none'
    }
  }
}

interface ISelectionProps {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const Radio: React.SFC<ISelectionProps & WithStyles<typeof styles>> = ({classes, disabled, className, checked, onClick}) => (
  <input
    type='radio'
    disabled={disabled}
    className={classNames(classes.radio, className)}
    checked={checked}
    readOnly={typeof onClick === 'function'}
    onClick={onClick}
  />
)

export default injectSheet(styles)(Radio)
