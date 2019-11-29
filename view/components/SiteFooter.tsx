import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import { Styles } from 'jss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const styles: Styles = {
  footer: {
    padding: '6px 30px 50px',
    background: '#1565c0',
    color: 'rgba(255,255,255,0.8)'
  },
  footerBody: {
    maxWidth: 1024,
    position: 'relative',
    margin: '0 auto',
    fontSize: '0.9rem'
  },
  footerContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  footerTitle: {
    marginTop: '24px',
    marginBottom: '8px',
    fontSize: '1rem',
    color: '#fff',
  },
  footerLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    }
  }
};

interface SiteFooterProps {
  className?: string;
}

const SiteFooter: React.SFC<WithStyles<typeof styles> & SiteFooterProps> = ({ classes, className }) => (
  <footer className={classNames(classes.footer, className)}>
    <div className={classes.footerBody}>
      <div className={classes.footerContent}>
        <div>
          <p className={classes.footerTitle}>
            <strong>
              <span style={{marginRight: '4px'}}>The</span>
              <span style={{marginRight: '2px'}}>Form</span>
            </strong>
            <span style={{fontSize: '0.7em', opacity: 0.9, verticalAlign: 'super'}}>.app</span>
          </p>
          <p><Link to='/about' className={classes.footerLink}>关于本站</Link></p>
          <p><Link to='/license' className={classes.footerLink}>开源协议</Link></p>
          <p><a href='https://github.com/EYHN/Form' className={classes.footerLink}>Github</a></p>
        </div>
        <div>
          <p className={classes.footerTitle}><strong>EYHN</strong> <span style={{fontSize: '0.7em', opacity: 0.9, verticalAlign: 'super'}}>Powered</span></p>
          <p><a href='http://eyhn.in' className={classes.footerLink}>服务状态</a></p>
          <p><a href='http://eyhn.in' className={classes.footerLink}>关于&thinsp;EYHN</a></p>
        </div>
        <span/>
      </div>
      <br/>
      <p>根据 <a href='https://www.gnu.org/licenses/agpl-3.0.html' target='_blank'>AGPL 许可证</a> 发布。Copyright © 2019 The Form</p>
    </div>
  </footer>
);

export default injectSheet(styles)(SiteFooter);
