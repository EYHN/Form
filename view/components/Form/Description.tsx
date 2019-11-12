import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  description: {
    display: 'block',
    fontSize: '0.9rem',
    marginBottom: '12px',
    width: '100%',
    cursor: 'auto'
  }
}

interface IFormItemProps {
  className?: string;
}

const Description: React.SFC<IFormItemProps & WithStyles<typeof styles>> = ({classes, className, children}) => (
  <article className={classNames(classes.description, className)}>
    {children}
  </article>
)

export default injectSheet(styles)(Description)
