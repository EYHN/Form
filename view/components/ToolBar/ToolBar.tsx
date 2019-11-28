import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';

export interface IToolBarProps {
  className?: string;
}

const styles: Styles = {
  main: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    maxHeight: 54
  }
}

const ToolBar: React.SFC<IToolBarProps & WithStyles<typeof styles>> = ({
  children, classes, className
}) => {
  return (
    <div className={classNames(classes.main, className)}>
      {children}
    </div>
  );
};

export default injectSheet(styles)(ToolBar);