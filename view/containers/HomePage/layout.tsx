import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import classNames from 'classnames';
import { Styles } from 'jss';
import Button from 'components/Button';
import Add from 'components/icons/Add';
import { Link } from 'react-router-dom';
import HomeAppBar from 'components/SiteAppBar';
import Folder from 'components/icons/Folder';
import SiteFooter from 'components/SiteFooter';

const styles: Styles = {
  root: {
    minHeight: '100vh',
    overflow: 'hidden'
  },
  header: {
    background: '#1565c0',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    boxShadow: '0px 5px 40px rgba(0,0,0,0.37) inset',
  },
  article: {
    padding: '100px 60px 150px',
    overflow: 'hidden',
    '&:nth-child(odd)': {
      background: '#f7f7f7'
    }
  },
  articleImg: {
    position: 'absolute',
  },
  articleImg1: {
    maxHeight: '300px',
    top: -50,
    left: 500
  },
  articleImg2: {
    maxHeight: '800px',
    top: -80,
    right: 550
  },
  articleBody: {
    maxWidth: 1024,
    position: 'relative',
    margin: '0 auto',
    textAlign: 'left'
  },
  articleLeftBody: {
    textAlign: 'left'
  },
  articleRightBody: {
    textAlign: 'right'
  },
  articleHeader: {
    display: 'inline-block',
    fontSize: '1.8rem',
    marginBottom: '16px',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'left'
  },
  articleMessage: {
    display: 'inline-block',
    fontSize: '1.2rem',
    color: '#666',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'left'
  },
  appbar: {
    paddingRight: 30,
    paddingLeft: 30,
    maxWidth: 1024,
    width: '100%',
    backgroundColor: 'transparent'
  },
  jumbotron: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    flexGrow: 1,
    marginBottom: '68px',
    minHeight: '500px',
    padding: '0 30px',
    maxWidth: '500px',
    textAlign: 'center',
  },
  jumbotronTitle: {
    fontSize: '3rem',
    fontWeight: 400
  },
  jumbotronSubTitle: {
    fontSize: '1.4rem',
    margin: '1em 0 2em 0'
  },
  button: {
    margin: '0 8px',
    background: '#d32f2f',
    color: '#fff',
    fontSize: '0.9rem',
    borderRadius: '5px',
    padding: '0 15px',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px',
    '&:active': {
      background: '#d32f2f'
    }
  },
  [`@media (max-width: 770px)`]: {
    appbar: {
      paddingRight: 16,
      paddingLeft: 16,
    },
    article: {
      padding: '80px 30px 80px',
    },
    articleBody: {
      paddingRight: '0',
      maxWidth: '416px',
      margin: '0 auto',
      textAlign: 'center'
    },
    articleImg: {
      position: 'unset',
      marginBottom: '16px',
      maxHeight: '200px',
      maxWidth: '100%'
    },
    articleHeader: {
      textAlign: 'center'
    },
    articleMessage: {
      textAlign: 'center'
    }
  }
};

interface IHomeLayoutProps {
  onClickNewForm: React.MouseEventHandler;
}

const HomeLayout: React.SFC<IHomeLayoutProps & WithStyles<typeof styles>> = ({classes, onClickNewForm, children}) => (
  <div className={classnames(classes.root)}>
    <header className={classes.header}>
      <HomeAppBar className={classes.appbar} />
    
      <div className={classes.jumbotron}>
        <h1 className={classes.jumbotronTitle}>网页表单</h1>
        <span className={classes.jumbotronSubTitle}>和&thinsp;Google Form&thinsp;一样好用，但更加安全的<wbr/>表单制作工具<wbr/>。</span>
        <div>
          <Link to="/panel/">
            <Button className={classes.button} shadow onClick={onClickNewForm}><Folder width={22} /> 我的表单</Button>
          </Link>
          <Button className={classes.button} shadow onClick={onClickNewForm}><Add width={22} /> 创建表单</Button>
        </div>
      </div>
    </header>
    <article className={classes.article}>
      <div className={classNames(classes.articleBody, classes.articleLeftBody)}>
        <img className={classNames(classes.articleImg, classes.articleImg1)} src={require('./macbookpro13_front.png')}></img><br/>
        <h1 className={classes.articleHeader}>我们尊重用户的隐私</h1><br/>
        <p className={classes.articleMessage}>我们保证不会偷窥表单填写的内容。每一份表单都经过加密处理，只有您本人可以解密查看，详情查看 安全性。</p>
      </div>
    </article>
    <article className={classes.article}>
      <div className={classNames(classes.articleBody, classes.articleRightBody)}>
        <img className={classNames(classes.articleImg, classes.articleImg2)} src={require('./xs.png')}></img><br/>
        <h1 className={classes.articleHeader}>任何设备</h1><br/>
        <p className={classes.articleMessage}>我们尊重用户的自由，您可以将本软件用于任何用途，也随时可以下载到整个系统的源代码，整个系统运行公开透明。</p>
      </div>
    </article>
    <article className={classes.article}>
      <div className={classNames(classes.articleBody, classes.articleLeftBody)}>
        <img className={classNames(classes.articleImg, classes.articleImg1)} src={require('./macbookpro13_front.png')}></img><br/>
        <h1 className={classes.articleHeader}>免费的自由软件</h1><br/>
        <p className={classes.articleMessage}>我们尊重用户的自由，您可以将本软件用于任何用途，也随时可以下载到整个系统的源代码，整个系统运行公开透明。</p>
      </div>
    </article>
    {children}
    <SiteFooter />
  </div>
);

export default injectSheet(styles)(HomeLayout);
