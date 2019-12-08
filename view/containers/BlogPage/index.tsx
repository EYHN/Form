import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import { Styles } from 'jss';
import HomeAppBar from 'components/SiteAppBar';
import Container from 'components/Container';
import Back from 'components/icons/Back';
import { Link, RouteComponentProps, Redirect } from 'react-router-dom';
import blog from 'blog';

const styles: Styles = {
  root: {
    background: '#e3f2fd',
    minHeight: '100vh',
    overflow: 'hidden'
  },
  card: {
    position: 'relative',
    zIndex: 2,
    paddingTop: 24,
    paddingRight: 32,
    paddingLeft: 32,
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    minHeight: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: 32,
    cursor: 'auto'
  },
  main: {
    padding: '48px 32px',
  },
  back: {
    fontSize: '0.85em',
    fontWeight: '500',
    color: '#787878',
    marginLeft: '-8px',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  title: {
    fontSize: '2em',
    paddingTop: '8px'
  },
  address: {
    fontStyle: 'normal',
    fontSize: '0.95em'
  },
  hr: {
    margin: '16px 0 32px',
    width: '100%',
    borderBottom: '1px solid #ccc'
  }
};

interface BlogPageProps {
  className?: string;
}

const BlogPage: React.SFC<RouteComponentProps<{id: string}> & WithStyles<typeof styles> & BlogPageProps> = ({match, classes}) => {
  const id = match.params.id as keyof typeof blog;
  if (!(id in blog)) return <Redirect to="/404" />
  return <div className={classnames(classes.root)}>
    <HomeAppBar />
    <main className={classes.main}>
      <Container className={classes.card}>
        <Link to='/blog' className={classes.back}><Back width='14px'/> 返回全部博客</Link>
        <h1 className={classes.title}>{blog[id].title}</h1>
        <address className={classes.address}>{blog[id].date} , {blog[id].auchor}</address>
        <div className={classes.hr}></div>
        {blog[id].content}
      </Container>
    </main>
  </div>
};

export default injectSheet(styles)(BlogPage);
