import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet, { WithStyles } from 'react-jss';
import Button from './Button';
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent : 'center',
    alignItems: 'start',
    zIndex: 1001
  },
  dialog: {
    position: 'relative',
    boxShadow: '0 12px 15px 0 rgba(0,0,0,0.24)',
    background: '#fff',
    borderRadius: '2px',
    marginTop: '3em',
    maxWidth: '592px',
    width: '100%'
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    background: 'rgba(0,0,0,0.502)'
  },
  header: {
    backgroundColor: '#1565c0',
    color: '#fff',
    margin: '0 0 24px',
    padding: '24px 24px 20px 24px'
  },
  title: {
    fontWeight: 'normal',
    fontSize: '1.25rem'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    margin: '24px 0 0',
    padding: '0 24px',
    minHeight: '65px',
    borderTop: '1px solid #e0e0e0',
    fontSize: '0.9em',
    fontWeight: 600,
    '&>*' : {
      marginLeft: '24px'
    }
  }
}

interface IProps {
  form?: boolean;
  title?: string;
  submitLabel?: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
  bodyClassName?: string;
  cancel?: boolean;
}

class Dialog extends React.PureComponent<IProps & WithStyles<typeof styles>> {
  dialogNode = document.createElement('div');
  prevOverflow = 'auto';

  handleKeydown = (ev: KeyboardEvent) => {
    if (ev.key === 'Enter') {
      if (typeof this.props.onSubmit === 'function')
      this.props.onSubmit();
      ev.preventDefault()
      return false;
    }
  }

  componentDidMount() {
    this.prevOverflow = document.body.style.overflow
    document.body.appendChild(this.dialogNode);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.body.removeChild(this.dialogNode);
    document.body.style.overflow = this.prevOverflow;
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleFormSubmit: React.FormEventHandler = (e) => {
    const { onSubmit } = this.props;

    if (typeof onSubmit === 'function') onSubmit();
    e.preventDefault();
  }

  public render() {
    const  { onClose, onSubmit, classes, children, cancel = true, form = false, title = '新信息', submitLabel = '确定', bodyClassName } = this.props;

    const Body = form ? 'form' : 'div';

    return ReactDOM.createPortal(
      <article className={classes.root}>
        <div className={classes.shadow}></div>
        <Body className={classNames(classes.dialog, bodyClassName)} onSubmit={this.handleFormSubmit}>
          <header className={classes.header}>
            <h3 className={classes.title}>{title}</h3>
          </header>
          {children}
          <footer className={classes.actions}>
            <Button type='submit' onClick={onSubmit} primary>{submitLabel}</Button>
            {cancel && <Button type='button' onClick={onClose}>取消</Button>}
          </footer>
        </Body>
      </article>, this.dialogNode);
  }
}

export default injectSheet(styles)(Dialog);
