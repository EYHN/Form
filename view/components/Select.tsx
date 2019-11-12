import React from 'react';
import injectSheet, { WithStyles, Styles } from "react-jss";
import classNames from 'classnames';

const styles: Styles = {
  root: {
    display: 'inline-block',
    position: 'relative',
    background: '#f5f5f5',
    borderRadius: '3px',
    overflow: 'hidden',
    minWidth: '125px',
    fontSize: '0.9rem'
  },
  select: {
    position: 'relative',
    zIndex: 1,
    width:'100%',
    padding: '12px 48px 12px 24px',
    outline: 'none',
    border: '0px',
    background: 'transparent',
    appearance: 'none',
    fallbacks: {
      '-webkit-appearance': 'none'
    }
  },
  dropDownIcon: {
    borderColor: '#aaa transparent',
    borderStyle: 'solid',
    borderWidth: '6px 6px 0 6px',
    height: 0,
    width: 0,
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: '18px'
  }
}

interface ISelectProps {
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select: React.SFC<ISelectProps & WithStyles<typeof styles>> = ({classes, disabled, value, className, onChange, children}) => (
  <div className={classNames(classes.root, className)}>
    <select disabled={disabled} className={classes.select} value={value} onChange={onChange}>{children}</select>
    <div className={classes.dropDownIcon} />
  </div>
)

export default injectSheet(styles)(Select)
