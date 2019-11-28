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
    padding: '10px 8px',
    flexWrap: 'wrap',
    color: '#fff',
    backgroundColor: '#1565c0'
  },
  side: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center'
  },
  rightSide: {
    justifyContent: 'flex-end'
  }
}

const AppBar: React.SFC<IAppBarProps & WithStyles<typeof styles>> = ({
  left, right, classes, className
}) => {
  return (
    <div className={classNames(classes.main, className)}>
      <div className={classes.side}>
        {left}
      </div>
      <div className={classNames(classes.side, classes.rightSide)}>
        {right}
      </div>
    </div>
  );
};

export default injectSheet(styles)(AppBar);