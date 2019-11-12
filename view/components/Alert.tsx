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
    alignItems: 'center',
    zIndex: 1001
  },
  dialog: {
    position: 'relative',
    boxShadow: '0 12px 15px 0 rgba(0,0,0,0.24)',
    background: '#fff',
    borderRadius: '2px',
    maxWidth: '240px',
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
    margin: '16px 0 16px',
    padding: '0 24px'
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.25rem'
  },
  main: {
    padding: '0 24px',
    margin: '8px 0 24px',
    color: 'rgba(0,0,0,.6)'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    margin: '8px 0 0',
    padding: '0 12px',
    minHeight: '52px',
    fontSize: '1em',
    fontWeight: 600,
    '&>*' : {
      marginLeft: '8px'
    }
  }
}

interface IProps {
  title?: string;
  submitLabel?: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
  bodyClassName?: string;
  cancel?: boolean;
}

class Alert extends React.PureComponent<IProps & WithStyles<typeof styles>> {
  alertNode = document.createElement('div');
  prevOverflow = 'auto';

  componentDidMount() {
    this.prevOverflow = document.body.style.overflow
    document.body.appendChild(this.alertNode);
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', (ev) => {
      if (ev.key === 'Enter') {
        if (typeof this.props.onSubmit === 'function')
        this.props.onSubmit();
      }
    });
  }

  componentWillUnmount() {
    document.body.removeChild(this.alertNode);
    document.body.style.overflow = this.prevOverflow;
  }
  public render() {
    const  { onClose, onSubmit, classes, children, cancel = true, title = "新信息", submitLabel = '确定', bodyClassName } = this.props;
    return ReactDOM.createPortal(
      <article className={classes.root}>
        <div className={classes.shadow}></div>
        <div className={classNames(classes.dialog, bodyClassName)}>
          <header className={classes.header}>
            <h3 className={classes.title}>{title}</h3>
          </header>
          <main className={classNames(classes.main)}>
            {children}
          </main>
          <footer className={classes.actions}>
            <Button onClick={onSubmit} primary>{submitLabel}</Button>
            {cancel && <Button onClick={onClose}>取消</Button>}
          </footer>
        </div>
      </article>, this.alertNode);
  }
}

export default injectSheet(styles)(Alert);
