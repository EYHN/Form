import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import { Styles } from 'jss';
import classNames from 'classnames';

const styles: Styles = {
  footer: {
    textAlign: 'center',
    color: 'rgba(0,0,0,.6)',
    fontSize: '0.8em',
    fontWeight: 500,
    margin: '16px'
  }
};

interface LiscenseFooterProps {
  className?: string;
}

const TextFooter: React.SFC<WithStyles<typeof styles> & LiscenseFooterProps> = ({ classes, className, children }) => (
  <footer className={classNames(classes.footer, className)}>
    {children}
  </footer>
);

export default injectSheet(styles)(TextFooter);
