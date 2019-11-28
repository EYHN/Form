import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';

interface IToolbarSeparatorProps {
  className?: string;
}

const styles: Styles = {
  separator: {
    borderLeft: '1px solid #e0e0e0',
    height: '32px',
    margin: '12px',
    width: 0
  }
}

const ToolbarSeparator: React.SFC<IToolbarSeparatorProps & WithStyles<typeof styles>> = ({className, classes}) => (
  <div className={classNames(classes.separator, className)} />
);

export default injectSheet(styles)(ToolbarSeparator);