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
    left={<Link className={classes.title} to='/'><AppBarTitle>The Form</AppBarTitle></Link>}
    right={
      <>
        <Link to='/blog'><AppBarButton>博客</AppBarButton></Link>
        <Link to='/blog'><AppBarButton>支持</AppBarButton></Link>
        <Link to='/blog'><AppBarButton>关于</AppBarButton></Link>
      </>
    }
  />
);

export default injectSheet(styles)(HomeAppBar);
