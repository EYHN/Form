import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  formItem: {
    paddingTop: '24px',
    paddingBottom: '24px'
  }
}

interface IFormItemProps {
  className?: string;
  component?: React.ReactType<{className: string}>;
}

const FormItem: React.SFC<IFormItemProps & WithStyles<typeof styles>> = ({classes, className, children, component: Component = 'div'}) => (
  <Component className={classNames(classes.formItem, className)}>
    {children}
  </Component>
)

export default injectSheet(styles)(FormItem)
