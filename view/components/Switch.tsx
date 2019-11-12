import React from 'react';
import injectSheet, { WithStyles, Styles } from "react-jss";
import classNames from 'classnames';

const styles: Styles = {
  root: {
    display: 'inline-block',
    position: 'relative',
    outline: 'none',
    width: '37px',
    height: '20px',
    verticalAlign: 'middle',
    userSelect: 'none'
  },
  disabledRoot: {
    '&>$trackChecked': {
      backgroundColor: '#545454',
      opacity: .54
    },
    '&>$thumbChecked': {
      backgroundColor: '#545454'
    }
  },
  track: {
    backgroundColor: '#000',
    position: 'absolute',
    top: '3px',
    width: '37px',
    height: '14px',
    willChange: 'opacity, background-color',
    transition: 'opacity 90ms cubic-bezier(.4,0,.2,1),background-color 90ms cubic-bezier(.4,0,.2,1)',
    borderRadius: '7px',
    opacity: .38
  },
  trackChecked: {
    backgroundColor: '#2196f3',
    opacity: .54
  },
  thumb: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    left: '0px',
    top: '0px',
    transform: 'translateX(0)',
    willChange: 'transform, background-color',
    boxShadow: '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)',
    transition: 'transform 90ms cubic-bezier(.4,0,.2,1),background-color 90ms cubic-bezier(.4,0,.2,1)',
    borderRadius: '50%',
    backgroundColor: '#fff'
  },
  thumbChecked: {
    transform: 'translateX(17px)',
    backgroundColor: '#2196f3'
  },
  native: {
    right: 'auto',
    width: '100%',
    height: '100%',
    margin: 0,
    opacity: 0,
    cursor: 'pointer'
  }
}

interface ISwitchProps {
  className?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Switch: React.SFC<ISwitchProps & WithStyles<typeof styles>> = ({classes, disabled, checked, className, onChange}) => (
  <div className={classNames(classes.root, disabled && classes.disabledRoot, className)}>
    <div className={classNames(classes.track, checked && classes.trackChecked)}></div>
    <div className={classNames(classes.thumb, checked && classes.thumbChecked)}></div>
    <input className={classes.native} disabled={disabled} type='checkbox' role='switch' checked={checked} onChange={onChange}></input>
  </div>
)

export default injectSheet(styles)(Switch)
