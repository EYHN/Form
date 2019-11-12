import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  root: {
    display: 'block',
    fontSize: '0.95em',
    lineHeight: 1.3,
    position: 'relative',
    '&>input:focus~$underscore:not($underScoreError)': {
      borderBottom: '3px solid #2196f3 !important'
    },
    '&>input:disabled~$underscore': {
      borderBottom: '1px dotted #777'
    }
  },
  rootInline: {
    display: 'inline-block',
  },
  input: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    minHeight: '1.3em',
    padding: '0px',
    boxSizing: 'content-box',
    outline: 'none',
    border: '0px',
    background: 'transparent'
  },
  underscore: {
    display: 'inline-block',
    position: 'absolute',
    top: 0,
    bottom: -3,
    left: 0,
    right: 0,
    borderBottom: '1px solid #777',
    transition: '125ms border-bottom-width cubic-bezier(.4,0,.6,1)'
  },
  underScoreError: {
    borderBottom: '3px solid #b00020 !important'
  }
}

interface ITextInputProps {
  className?: string;
  inputClassName?: string;
  type?: string;
  error?: boolean;
  value?: string;
  placeholder?: string;
  inline?: boolean;
  disabled?: boolean;
  noUnderScore?: boolean;
  underScoreColor?: string;
  underScoreErrorColor?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  autoFocus?: boolean;
  readOnly?: boolean;
  focus?: boolean;
  name?: string;
  autoComplete?: string;
  inputRef?: (element: HTMLInputElement) => void;
}

class TextInput extends React.PureComponent<ITextInputProps & WithStyles<typeof styles>> {
  inputElement: HTMLInputElement;
  componentDidUpdate(prevProps: ITextInputProps) {
    if (prevProps.focus === false && this.props.focus === true) {
      this.inputElement.focus();
    }
  }

  handleClick: React.MouseEventHandler<HTMLInputElement> = () => {
    const { readOnly, disabled } = this.props;

    // Click to select all the text
    if (readOnly && !disabled) {
      this.inputElement.focus();
      this.inputElement.select();
    }
  }

  handleRef: React.Ref<HTMLInputElement> = (ref) => {
    this.inputElement = ref;
  }

  render() {
    const { classes, type = 'text', inline, disabled, noUnderScore, underScoreColor = '#bdbdbd', placeholder, value, className, inputClassName, error, autoFocus, readOnly, onChange, onBlur, name, autoComplete } = this.props;
    return <div className={classNames(classes.root, inline && classes.rootInline, className)}>
      <input
        ref={this.handleRef}
        name={name}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        className={classNames(classes.input, inputClassName)}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        onClick={this.handleClick}
        value={value}
      />
      <div style={{ borderBottomColor: noUnderScore ? 'transparent' : underScoreColor }} className={classNames(classes.underscore, error && classes.underScoreError)}></div>
    </div>
  }
}

export default injectSheet(styles)(TextInput)
