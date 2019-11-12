import React from 'react';
import injectSheet, { Styles, WithStyles } from 'react-jss';
import classNames from 'classnames';

interface IAppBarTitleProps {
  className?: string;
}

const styles: Styles = {
  title: {
    fontWeight: 600,
    fontSize: '1.25rem',
    lineHeight: '48px',
    padding: '0 12px'
  }
}

const AppBarTitle: React.SFC<IAppBarTitleProps & WithStyles<typeof styles>> = ({children, className, classes}) => (
  <h1 className={classNames(classes.title, className)}>{children}</h1>
);

export default injectSheet(styles)(AppBarTitle);