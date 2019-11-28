import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';

interface IToolBarSpringProps {
  className?: string;
  onClick?: React.MouseEventHandler;
}

const styles: Styles = {
  full: {
    flexGrow: 1
  }
}

const ToolBarSpring: React.SFC<IToolBarSpringProps & WithStyles<typeof styles>> = ({onClick, className, classes}) => (
  <div className={classNames(classes.full, className)} onClick={onClick} />
);

export default injectSheet(styles)(ToolBarSpring);