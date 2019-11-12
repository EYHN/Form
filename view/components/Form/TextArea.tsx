import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  root: {
    display: 'block',
    position: 'relative',
    lineHeight: 1.3,
    fontSize: '1em',
    '&>div': {
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      borderBottom: '1px solid #bdbdbd',
      transition: '125ms border-bottom cubic-bezier(.4,0,.6,1)'
    },
    '&>textarea:focus~div': {
      borderBottom: '3px solid #2196f3 !important'
    },
    '&>input:disabled~div': {
      borderBottom: '1px dotted #777'
    }
  },
  textarea: {
    position: 'relative',
    fontSize: '0.95em',
    zIndex: 1,
    minHeight: '1.3em',
    width: '100%',
    padding: '0',
    outline: 'none',
    border: '0px',
    background: 'transparent',
    overflow: 'hidden',
    resize: 'none'
  }
}

interface ITextAreaProps {
  className?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  underScoreColor?: string;
  noUnderScore?: boolean;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

interface IState {
  height?: number;
}

class TextArea extends React.PureComponent<ITextAreaProps & WithStyles<typeof styles>, IState> {
  textAreaElement: HTMLTextAreaElement;

  handleRef: React.Ref<HTMLTextAreaElement> = (ref) => {
    this.textAreaElement = ref;
  }

  componentDidMount() {
    this.textAreaElement.style.height = '0';
    this.textAreaElement.style.height = this.textAreaElement.scrollHeight + 'px';
  }

  componentDidUpdate(prevProps: ITextAreaProps) {
    if (this.props.value !== prevProps.value) {
      this.textAreaElement.style.height = '0';
      this.textAreaElement.style.height = this.textAreaElement.scrollHeight + 'px';
    }
  }

  render() {
    const { classes, placeholder, value, className, onChange, noUnderScore, underScoreColor = '#bdbdbd', disabled } = this.props;
    return <div className={classNames(classes.root, className)}>
      <textarea
        disabled={disabled}
        ref={ref => this.textAreaElement = ref}
        readOnly={typeof onChange !== 'function'}
        className={classes.textarea}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <div style={{borderBottomColor: noUnderScore ? 'transparent' : underScoreColor}}></div>
    </div>
  }
}

export default injectSheet(styles)(TextArea)
