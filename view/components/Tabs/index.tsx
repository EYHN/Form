import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';

export interface IAppBarProps {
  className?: string;
  names: React.ReactNode[];
  value?: string | number;
  disabled?: boolean;
  height?: string;
  onChange?: (name: React.ReactNode, index: number) => void;
}

const styles: Styles = {
  tab: {
    display: 'inline-block',
    lineHeight: '46px',
    fontWeight: 600,
    fontSize: '0.9rem',
    padding: '0 24px',
    cursor: 'pointer',
    color: '#bdbdbd',
    borderBottom: '2px solid transparent'
  },
  tabactive: {
    color: '#1565c0',
    borderColor: '#1565c0'
  },
  disabledTab: {
    cursor: 'default',
  },
  disabledTabActive: {
    color: '#545454',
    borderColor: '#545454'
  }
}

const Tabs: React.SFC<IAppBarProps & WithStyles<typeof styles>> = ({
  names, value, onChange, classes, className, disabled, height = '46px'
}) => {
  const tabs = names.map((name, index) => 
    <div
      style={{
        lineHeight: height
      }}
      key={index}
      className={classNames(classes.tab, disabled && classes.disabledTab, (typeof value === 'number' ? index === value : value === name) && (disabled ? classes.disabledTabActive : classes.tabactive))}
      onClick={() => {
        !disabled && typeof onChange === 'function' && onChange(name, index);
      }}
    >
      {name}
    </div>
  );
  return (
    <div className={classNames(classes.root, className)}>
      {tabs}
    </div>
  );
};

export default injectSheet(styles)(Tabs);