import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classNames from 'classnames';
import { Styles } from 'jss';
import IconButton from './icons/IconButton';
import Delete from './icons/Delete';

const styles: Styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '12px 16px',
    borderTop: '8px solid #1565c0',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    height: 240,
    width: 208,
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  title: {
    fontSize: '1.6em',
    lineHeight: 1.3,
    fontWeight: 500,
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow:'ellipsis',
    whiteSpace: 'nowrap'
  },
  subtitle: {
    fontSize: '0.95em',
    color: 'rgba(0,0,0,.6)',
    fontWeight: 600
  },
  date: {
    lineHeight: '24px',
    fontSize: '0.9em',
    color: '#545454'
  },
  button: {
    position: 'absolute',
    right: '12px',
    bottom: '12px'
  }
};

interface IFormCardProps {
  className?: string;
  title: string;
  subtitle: string;
  date: string;
  onClick: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
}

const FormCard: React.SFC<WithStyles<typeof styles> & IFormCardProps> = ({className, classes, title, subtitle = "", onClick, onDelete, date}) => (
  <section className={classNames(classes.card, className)} onClick={(e) => onClick(e)}>
    <p className={classes.subtitle}>加密表单</p>
    <h3 className={classes.title}>{title}</h3>
    <p className={classes.subtitle}>
      {subtitle.length > 30 ? subtitle.substr(0, 30) + "…" : subtitle}
    </p>
    <div style={{flexGrow: 1}}></div>
    <span className={classes.date}>{date && `于 ${new Date(date).toLocaleDateString('zh-cn')} 创建`}</span>
    <IconButton className={classes.button} icon={Delete} onClick={e => (onDelete(e),e.stopPropagation())} />
  </section>
);

export default injectSheet(styles)(FormCard);
