import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';

export interface IAppBarProps {
  className?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const styles: Styles = {
  main: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 8px',
    color: '#fff',
    backgroundColor: '#1565c0'
  },
  full: {
    flexGrow: 1
  }
}

const AppBar: React.SFC<IAppBarProps & WithStyles<typeof styles>> = ({
  left, right, classes, className
}) => {
  return (
    <div className={classNames(classes.main, className)}>
      {left}
      <span className={classNames(classes.full)} />
      {right}
    </div>
  );
};

export default injectSheet(styles)(AppBar);