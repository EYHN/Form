import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import Checkbox from '../Checkbox';
import Radio from '../Radio';
import TextInput from './TextInput';
import { Styles } from 'jss';

const styles: Styles = {
  selection: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '8px',
    paddingBottom: '8px',
    minHeight: '27px'
  },
  radio: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    verticalAlign: 'bottom'
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    verticalAlign: 'bottom'
  },
  disabled: {
    cursor:'default'
  },
  label: {
    cursor: 'pointer',
    fontSize: '0.95em',
    paddingLeft: 12,
    paddingRight: 12
  },
  labelDisabled: {
    cursor: 'auto'
  },
  textInput: {
  },
  grow: {
    flexGrow: 1
  }
}

interface ISelectionProps {
  className?: string;
  type?: 'radio' | 'checkbox';
  checked?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  textInput?: boolean;
  textValue?: string;
  textPlaceholder?: string;
  onTextChange?: React.ChangeEventHandler;
  onTextBlur?: React.FocusEventHandler;
  component?: React.ReactType<{ className: string }>;
  ref?: React.Ref<any>;
}

const Selection: React.SFC<ISelectionProps & WithStyles<typeof styles>> = (
  {
    classes,
    className,
    children,
    disabled,
    checked,
    onClick,
    textInput,
    textValue,
    textPlaceholder,
    onTextChange,
    onTextBlur,
    component: Component = 'div',
    type = 'radio'
  }) => (
    <Component className={classNames(classes.selection, className)}>
      {type === 'radio' ?
        <Radio
          disabled={disabled}
          checked={checked}
          onClick={onClick}
          className={classNames(classes.radio, disabled && classes.disabled)}
        /> :
        <Checkbox
          disabled={disabled}
          className={classNames(classes.checkbox, disabled && classes.disabled)}
          checked={checked}
          onClick={onClick}
        />}
      {children && <label
        className={classNames(classes.label, disabled && classes.labelDisabled, !textInput && classes.grow)}
        onClick={onClick}
      >
        {children}
      </label>}
      {
        textInput &&
        <TextInput disabled={disabled} placeholder={textPlaceholder} className={classNames(classes.textInput, classes.grow)} onChange={onTextChange} onBlur={onTextBlur} value={textValue}></TextInput>
      }
    </Component>
  )

export default injectSheet(styles)(Selection)
