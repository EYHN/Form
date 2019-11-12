import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  root: {
    position: 'relative',
    '&:hover > $tipLeft' : {
      opacity: 1,
      transform: 'translateY(-50%) translateX(-125%) scale(1)'
    },
    '&:hover > $tipRight' : {
      opacity: 1,
      transform: 'translateY(-50%) translateX(125%) scale(1)'
    },
    '&:hover > $tipTop' : {
      opacity: 1,
      transform: 'translateY(-125%) translateX(-50%) scale(1)'
    },
    '&:hover > $tipBottom' : {
      opacity: 1,
      transform: 'translateY(125%) translateX(-50%) scale(1)'
    }
  },
  tip: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.7)',
    color: '#fff',
    opacity: 0,
    wordBreak: 'keep-all',
    pointerEvents: 'none',
    fontSize: '0.8rem',
    borderRadius: '2px',
    fontWeight: 500,
    padding: '5px 8px 6px',
    transformOrigin: '50% 50% 0px',
    transition: 'transform 250ms cubic-bezier(.4,0,.2,1), opacity 125ms linear',
  },
  tipLeft: {
    top: '50%',
    left: 0,
    transform: 'translateY(-50%) translateX(0%) scale(0.3)'
  },
  tipRight: {
    top: '50%',
    right: 0,
    transform: 'translateY(-50%) translateX(0%) scale(0.3)'
  },
  tipTop: {
    left: '50%',
    top: 0,
    transform: 'translateY(0%) translateX(-50%) scale(0.3)'
  },
  tipBottom: {
    left: '50%',
    bottom: 0,
    transform: 'translateY(0%) translateX(-50%) scale(0.3)'
  }
}

interface ITooltipProps {
  className?: string;
  tip: string;
  dir: string;
  disabled?: boolean;
}

const Tooltip: React.SFC<ITooltipProps & WithStyles<typeof styles>> = ({classes, className, tip, dir = 'right', children, disabled}) => (
  <div className={classNames(classes.root, className)}>
    {children}
    {!disabled && <span className={classNames(classes.tip, {
      [classes.tipLeft]: dir === 'left',
      [classes.tipRight]: dir === 'right',
      [classes.tipTop]: dir === 'top',
      [classes.tipBottom]: dir === 'bottom'
    })}>{tip}</span>}
  </div>
)

export default injectSheet(styles)(Tooltip)
