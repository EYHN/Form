import React from 'react';
import { Styles } from 'jss';
import injectSheet, { WithStyles } from 'react-jss';

const styles: Styles = {
  '@keyframes dash': {
    '0%': {
      strokeDasharray: '1,200',
      strokeDashoffset: 0,
     },
     '50%': {
      strokeDasharray: '89,200',
      strokeDashoffset: -35,
     },
     '100%': {
      strokeDasharray: '89,200',
      strokeDashoffset: -124,
     }
  },
  '@keyframes rotate': {
    '100%': {
      transform: 'rotate(360deg)'
    }
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circular: {
    animation: '$rotate 2s linear infinite',
    height: '100%',
    width: '100%',
    maxHeight: '100px',
    position: 'relative',
    maxWidth: '100px'
  },
  path: {
    strokeDasharray: 1200,
    strokeDashoffset: 0,
    stroke: '#0057e7',
    animation: '$dash 1.5s ease-in-out infinite',
    strokeLinecap: 'round',
  }
}

interface LoadingIndicatorProps {
  width?: number | string;
  height?: number | string;
}

const LoadingIndicator: React.SFC<LoadingIndicatorProps & WithStyles<typeof styles>> = ({width, height, classes}) => (
  <div className={classes.container} style={{width, height}}>
    <svg className={classes.circular} viewBox="0 0 100 100">
      <circle className={classes.path} cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
    </svg>
  </div>
);

export default injectSheet(styles)(LoadingIndicator);
