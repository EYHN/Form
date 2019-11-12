import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import { Styles } from 'jss';
import { ISvgIconProps } from './icons/SvgIcon';
import Warning from './icons/Warning';

const styles: Styles = {
  root: {
    textAlign: 'center',
    padding: '48px 24px'
  },
  icon: {
    height: '100px',
    margin: '24px'
  },
  message: {
    fontSize: '1rem',
    color: '#717171'
  }
};

interface IndicatorProps {
  className?: string;
  icon?: (props: ISvgIconProps) => JSX.Element;
  message?: React.ReactNode
}

const Indicator: React.SFC<WithStyles<typeof styles> & IndicatorProps> = ({className, classes, icon: Icon = Warning, message}) => (
  <div className={classnames(classes.root, className)}>
    <Icon className={classes.icon} />
    <p className={classes.message}>{message}</p>
  </div>
);

export default injectSheet(styles)(Indicator);
