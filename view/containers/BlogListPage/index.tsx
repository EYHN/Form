import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import { Styles } from 'jss';
import HomeAppBar from 'components/SiteAppBar';
import Container from 'components/Container';
import { Link } from 'react-router-dom';
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
    paddingRight: 32,
    paddingLeft: 32,
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    minHeight: '500px',
    borderRadius: '8px',
    overflow: 'hidden',
    marginBottom: 32
  },
  main: {
    padding: '48px 32px',
  },
  title: {
    fontSize: '2em',
    padding: '32px 0 16px'
  },
  hr: {
    margin: '16px 0 32px',
    width: '100%',
    borderBottom: '1px solid #ccc'
  },
  item: {
    display: 'inline-block',
    width: '33%',
    paddingLeft: '40px',
    paddingTop: '40px',
    paddingBottom: '40px',
    borderTop: '1px dotted #ccc'
  },
  itemTitle: {
    fontSize: '1.5em',
    fontWeight: '600',
    borderBottom: '1px solid #ccc',
    textDecoration: 'none',
    lineHeight: '1.3',
    '&:hover': {
      textDecoration: 'none'
    }
  },
  itemSubtitle: {
    fontSize: '1em',
    fontWeight: '600',
    color: '#787878',
    lineHeight: 3
  },
  itemAddress: {
    fontStyle: 'normal',
    fontSize: '1em',
    fontWeight: '400',
    color: '#787878'
  },
  [`@media (max-width: 1400px)`]: {
    item: {
      width: '50%'
    }
  },
  [`@media (max-width: 1100px)`]: {
    item: {
      width: '100%',
      paddingLeft: '0px'
    }
  }
};

interface BlogListPageProps {
  className?: string;
}

const BlogListPage: React.SFC<WithStyles<typeof styles> & BlogListPageProps> = ({classes}) => (
  <div className={classnames(classes.root)}>
    <HomeAppBar />
    <main className={classes.main}>
      <Container className={classes.card}>
        <h1 className={classes.title}>所有博客</h1>
        <article className={classes.item}>
          {
            Reflect.ownKeys(blog).map(
              (id: keyof typeof blog) => <React.Fragment key={id.toString()}>
                <Link to={'/blog/' + id} className={classes.itemTitle}>{blog[id].title}</Link><br/>
                <span className={classes.itemSubtitle}>{blog[id].date}</span>
                <address className={classes.itemAddress}>{blog[id].auchor}</address>
              </React.Fragment>
            )
          }
        </article>
      </Container>
    </main>
  </div>
);

export default injectSheet(styles)(BlogListPage);
