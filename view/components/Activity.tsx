import React from 'react';
import ReactDOM from 'react-dom';
import injectSheet, { Styles, WithStyles } from 'react-jss';
import AppBar from './AppBar';
import AppBarIconButton from './AppBar/AppBarIconButton';
import AppBarTitle from './AppBar/AppBarTitle';
import Clear from './icons/Clear';
import AppBarButton from './AppBar/AppBarButton';
import classNames from 'classnames';

const styles: Styles = {
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1001,
    background: '#fff'
  },
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent : 'center',
    alignItems: 'start',
    '&>*': {
      width: '100%'
    }
  },
  appbar: {
    margin: '0 0 24px'
  },
  body: {
    flexGrow: 1
  }
}

interface IProps {
  form?: boolean;
  title?: string;
  submitLabel?: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
  bodyClassName?: string;
}

class Activity extends React.PureComponent<IProps & WithStyles<typeof styles>> {
  activityNode = document.createElement('div');
  prevOverflow = 'auto';
  componentDidMount() {
    this.prevOverflow = document.body.style.overflow
    document.body.appendChild(this.activityNode);
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    document.body.removeChild(this.activityNode);
    document.body.style.overflow = this.prevOverflow;
  }

  handleFormSubmit: React.FormEventHandler = (e) => {
    const { onSubmit } = this.props;

    if (typeof onSubmit === 'function') {
      onSubmit();
    }

    e.preventDefault();
  }

  public render() {
    const  { onClose, onSubmit, form = false, classes, children, title, bodyClassName, submitLabel='提交' } = this.props;

    const Container = form ? 'form' : 'div';

    return ReactDOM.createPortal(
      <article className={classNames(classes.root, bodyClassName)}>
        <Container className={classes.container} onSubmit={this.handleFormSubmit}>
          <AppBar
            className={classes.appbar}
            left={
              <>
                <AppBarIconButton icon={Clear} onClick={onClose}></AppBarIconButton>
                <AppBarTitle>{title}</AppBarTitle>
              </>
            } 
            right={<AppBarButton type='submit' onClick={onSubmit}>{submitLabel}</AppBarButton>}
          />
          <div className={classes.body}>
            {children}
          </div>
        </Container>
    </article>, this.activityNode);
  }
}

export default injectSheet(styles)(Activity);
