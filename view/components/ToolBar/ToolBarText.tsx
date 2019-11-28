import React from 'react';
import injectSheet, { Styles, WithStyles } from 'react-jss';
import classNames from 'classnames';

interface IToolBarTextProps {
  className?: string;
}

const styles: Styles = {
  text: {
    lineHeight: '36px',
    margin: '0 6px',
    fontSize: '0.9em'
  }
}

const ToolBarText: React.SFC<IToolBarTextProps & WithStyles<typeof styles>> = ({children, className, classes}) => (
  <span className={classNames(classes.text, className)}>{children}</span>
);

export default injectSheet(styles)(ToolBarText);