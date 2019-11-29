import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import { Styles } from 'jss';
import AppBar from './AppBar';
import AppBarTitle from './AppBar/AppBarTitle';
import AppBarButton from './AppBar/AppBarButton';
import { Link } from 'react-router-dom';

const styles: Styles = {
  title: {
    color: 'inherit'
  }
};

interface HomeAppBarProps {
  className?: string;
}

const HomeAppBar: React.SFC<WithStyles<typeof styles> & HomeAppBarProps> = ({ classes, className }) => (
  <AppBar
    className={className}
    left={<Link className={classes.title} to="/"><AppBarTitle>The Form</AppBarTitle></Link>}
    right={
      <>
        <AppBarButton>博客</AppBarButton>
        <AppBarButton>支持</AppBarButton>
        <AppBarButton>关于</AppBarButton>
      </>
    }
  />
);

export default injectSheet(styles)(HomeAppBar);
