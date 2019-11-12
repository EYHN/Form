import classNames from 'classnames';
import React from 'react';
import { Styles } from 'jss';
import { jss } from 'styles';

const theme = {
  textColor: '#5c5c5c',
  textSecondaryColor: '#9f9f9f',
  linkColor: '#5c5c5c',
  linkDecorationColor: '#a4a4a4',
  linkSecondaryColor: '#7d7d7d',
  linkDecorationSecondaryColor: '#9f9f9f',
  linkHoverColor: '#000',
  linkDecorationHoverColor: '#000',
  headingColor: '#1a1a1a',
  headingSecondaryColor: '#4a4a4a'
};

const styles: Styles = {
  all: {
    lineHeight: 1.6
  },
  p: {
    margin: '0.7em 0 0.7em',
    textIndent: '2em'
  },
  a: {
    '&:link': {
      color: theme.linkColor,
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.linkDecorationColor}`
    },
    '&:visited': {
      color: theme.linkSecondaryColor,
      textDecoration: 'none',
      borderBottom: `1px dotted ${theme.linkDecorationSecondaryColor}`
    },
    '&:hover': {
      color: theme.linkHoverColor,
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.linkDecorationHoverColor}`
    }
  },
  h1: {
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '1.5em',
    color: theme.headingColor,
    marginTop: '50px'
  },
  h2: {
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '1.5em',
    color: theme.headingColor,
    marginTop: '50px'
  },
  h3: {
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '1.2em',
    color: theme.headingColor,
    marginTop: '50px'
  },
  h4: {
    fontWeight: 'bold',
    clear: 'both',
    fontSize: '1em',
    color: theme.headingColor,
    marginBottom: '6px',
    width: '600px'
  },
  h5: {
    fontWeight: 'bold',
    clear: 'both',
    fontSize: '1em',
    marginBottom: '6px',
    width: '600px',
    color: theme.headingSecondaryColor
  },
  h6: {
    fontWeight: 'bold',
    clear: 'both',
    fontSize: '1em',
    marginBottom: '6px',
    width: '600px',
    color: theme.headingSecondaryColor,
    textIndent: '2em'
  },
  ul: {
    listStyle: 'disc',
    margin: '0 0 1em',
    padding: '0',
    width: '100%',
    clear: 'both'
  },
  li: {
    margin: '0 0 0 2em'
  },
  dl: {
    margin: '18px 103px 18px 0'
  },
  dt: {
    fontWeight: 'bold'
  },
  dd: {
    margin: '0 0 18px 0'
  },
  img: {
    outline: '1px solid #cacaca',
    outlineOffset: '-1px',
    padding: '1px',
    marginLeft: '1px',
    marginBottom: '18px',
    maxWidth: '99%',
    height: 'auto',
    width: '99%',
  },
  imgwithtitle: {
    marginBottom: '8px',
  },
  imginline: {
    maxWidth: 'calc(99% - 2em)'
  },
  imgtitle: {
    display: 'block',
    marginBottom: '18px',
    textAlign: 'center',
    fontSize: '0.9em',
    color: theme.textSecondaryColor
  },
  imgcontainer: {
    textIndent: '0'
  },
  pre: {
    display: 'block',
    overflow: 'auto',
    maxWidth: '99%',
    fontSize: '14px',
    lineHeight: '20px',
    padding: '16px',
    tabSize: '1.5em',
    background: 'rgb(40, 44, 52)',
    color: '#bfbfbf',
    borderRadius: '10px',
    fontFamily: 'source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace'
  },
  block: {
    borderLeftWidth: '9px',
    borderLeftStyle: 'solid',
    padding: '12px 45px 12px 26px',
    marginBottom: '30px',
    marginTop: '20px'
  },
  blocktitle: {
    fontWeight: 'bold',
    clear: 'both',
    fontSize: '1em',
    color: theme.headingColor,
    marginBottom: '6px',
    width: '600px'
  },
  blockquote: {
    backgroundColor: '',
    borderLeftColor: '#dfe2e5',
    color: theme.textSecondaryColor
  },
  tip: {
    backgroundColor: '#f3f5f7',
    borderLeftColor: '#42b983'
  },
  tiptitle: {
    color: theme.headingColor
  },
  warning: {
    backgroundColor: 'rgba(255, 229, 100, 0.3)',
    borderLeftColor: '#e7c000',
    color: '#6b5900'
  },
  warningtitle: {
    color: '#b29400'
  },
  danger: {
    backgroundColor: '#ffe6e6',
    borderLeftColor: '#c00',
    color: '#4d0000'
  },
  dangertitle: {
    color: '#900'
  },
  table: {
    borderCollapse: 'collapse',
    margin: '16px 0',
    display: 'block',
    overflowX: 'auto',
    color: '#333333'
  },
  tr: {
    borderTop: '1px solid #dfe2e5',
    ':nth-child(2n)': {
      backgroundColor: '#f6f8fa'
    }
  },
  th: {
    border: '1px solid #dfe2e5',
    padding: '.6em 1em'
  },
  td: {
    border: '1px solid #dfe2e5',
    padding: '.6em 1em'
  }
};

const {classes} = jss.createStyleSheet(styles).attach();

function withClassName(Component: React.ComponentType<{className?: string}> | string, classname: string): React.SFC<{className?: string}> {
  return (props) => (
    React.createElement(Component, {
      ...props,
      className: classNames(classname, props.className)
    })
  );
}

const ImageFigure: React.SFC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({title, className, ...props}) => (
  <figure className={classNames(classes.all, classes.imgcontainer)}>
    <img className={classNames(classes.all, classes.img, title && classes.imgwithtitle, className)} title={title} {...props} />
    {title && <span className={classNames(classes.all, classes.imgtitle)}>{title}</span>}
  </figure>
);

const ImageInline: React.SFC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({title, className, ...props}) => (
    <img className={classNames(classes.all, classes.imginline, className)} title={title} {...props} />
);

const Image: React.SFC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {figure?: boolean}> = ({figure, ...props}) => {
  if (typeof props.alt === 'boolean') {
    delete props.alt
  }
  return figure ? ImageFigure(props) : ImageInline(props)
};

const Link: React.SFC<React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>> = ({className, children, ...props}) => {
  return <a className={classNames(classes.all, classes.a, className)} {...props}>
    {children}
  </a>
};

const tip: React.SFC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({title = 'TIP', className, children, ...props}) => (
  <div className={classNames(classes.all, classes.block, classes.tip, className)} {...props}>
    <h4 className={classNames(classes.all, classes.blocktitle, classes.tiptitle, className)}>{title}</h4>
    {children}
  </div>
);

const warning: React.SFC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({title = 'WARNING', className, children, ...props}) => (
  <div className={classNames(classes.all, classes.block, classes.warning, className)} {...props}>
    <h4 className={classNames(classes.all, classes.blocktitle, classes.warningtitle, className)}>{title}</h4>
    {children}
  </div>
);

const danger: React.SFC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({title = 'DANGER', className, children, ...props}) => (
  <div className={classNames(classes.all, classes.block, classes.danger, className)} {...props}>
    <h4 className={classNames(classes.all, classes.blocktitle, classes.dangertitle, className)}>{title}</h4>
    {children}
  </div>
);

const Writing = {
  p: withClassName('p', classNames(classes.all, classes.p)),
  h1: withClassName('h1', classNames(classes.all, classes.h1)),
  h2: withClassName('h2', classNames(classes.all, classes.h2)),
  h3: withClassName('h3', classNames(classes.all, classes.h3)),
  h4: withClassName('h4', classNames(classes.all, classes.h4)),
  h5: withClassName('h5', classNames(classes.all, classes.h5)),
  h6: withClassName('h5', classNames(classes.all, classes.h5)),
  a: Link,
  ul: withClassName('ul', classNames(classes.all, classes.ul)),
  li: withClassName('li', classNames(classes.all, classes.li)),
  dl: withClassName('dl', classNames(classes.all, classes.dl)),
  dt: withClassName('dt', classNames(classes.all, classes.dt)),
  dd: withClassName('dd', classNames(classes.all, classes.dd)),
  pre: withClassName('pre', classNames(classes.all, classes.pre)),
  img: Image,
  blockquote: withClassName('blockquote', classNames(classes.all, classes.blockquote)),
  table: withClassName('table', classNames(classes.all, classes.table)),
  tr: withClassName('tr', classNames(classes.all, classes.tr)),
  th: withClassName('dd', classNames(classes.all, classes.dd)),
  td: withClassName('td', classNames(classes.all, classes.td)),
  tip: tip,
  warning: warning,
  danger: danger
};

export default Writing;