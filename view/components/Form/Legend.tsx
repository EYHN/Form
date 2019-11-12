import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  legend: {
    display: 'block',
    fontSize: '1.25rem',
    marginBottom: '6px',
    width: '100%',
    cursor: 'auto'
  }
}

interface IFormItemProps {
  className?: string;
}

const Legend: React.SFC<IFormItemProps & WithStyles<typeof styles>> = ({classes, className, children}) => (
  <div className={classNames(classes.legend, className)}>
    {children}
  </div>
)

export default injectSheet(styles)(Legend)
