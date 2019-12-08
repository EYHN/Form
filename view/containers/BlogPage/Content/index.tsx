import injectSheet, { WithStyles } from 'react-jss';
import React from 'react';
import classNames from 'classnames';

export const elements = Proxy;

const theme = {
  content: {
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
  }
};

const styles = {
  all: {
    lineHeight: 1.6,
  },
  p: {
    margin: '0.7em 0 0.7em',
    textIndent: '2em'
  },
  a: {
    '&:link': {
      color: theme.content.linkColor,
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.content.linkDecorationColor}`
    },
    '&:visited': {
      color: theme.content.linkSecondaryColor,
      textDecoration: 'none',
      borderBottom: `1px dotted ${theme.content.linkDecorationSecondaryColor}`
    },
    '&:hover': {
      color: theme.content.linkHoverColor,
      textDecoration: 'none',
      borderBottom: `1px solid ${theme.content.linkDecorationHoverColor}`
    }
  },
  h1: {
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '1.5em',
    color: theme.content.headingColor,
    marginTop: '50px'
  },
  h2: {
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '1.5em',
    color: theme.content.headingColor,
    marginTop: '50px'
  },
  h3: {
    fontWeight: 'bold',
    marginBottom: '20px',
    fontSize: '1.2em',
    color: theme.content.headingColor,
    marginTop: '50px'
  },
  h4: {
    fontWeight: 'bold',
    clear: 'both',
    fontSize: '1em',
    color: theme.content.headingColor,
    marginBottom: '6px',
    width: '600px'
  },
  h5: {
    fontWeight: 'bold',
    clear: 'both',
    fontSize: '1em',
    marginBottom: '6px',
    width: '600px',
    color: theme.content.headingSecondaryColor
  },
  h6: {
    fontWeight: 'bold',
    clear: 'both',
    fontSize: '1em',
    marginBottom: '6px',
    width: '600px',
    color: theme.content.headingSecondaryColor,
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
    display: 'block',
    outline: '1px solid #cacaca',
    outlineOffset: '-1px',
    padding: '1px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '18px',
    maxWidth: '99%',
    height: 'auto',
    //width: '99%',
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
    color: theme.content.textSecondaryColor
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
    color: theme.content.headingColor,
    marginBottom: '6px',
    width: '600px'
  },
  blockquote: {
    backgroundColor: '',
    borderLeftColor: '#dfe2e5',
    color: theme.content.textSecondaryColor
  },
  tip: {
    backgroundColor: '#f3f5f7',
    borderLeftColor: '#42b983'
  },
  tiptitle: {
    color: theme.content.headingColor
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

function withClasses(Component: React.ComponentType<{className?: string}> | string, ...styleNames: (keyof typeof styles)[]): React.SFC<WithStyles<typeof styles> & {className?: string}>{
  return ({classes, className, ...otherProps}) => (
    React.createElement(Component, {
      ...otherProps,
      className: classNames(...(styleNames || []).map(name => classes[name]), className)
    })
  );
}

const ImageFigure: React.SFC<WithStyles<typeof styles> & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({classes, title, className, ...props}) => (
  <figure className={classNames(classes.all, classes.imgcontainer)}>
    <img className={classNames(classes.all, classes.img, title && classes.imgwithtitle, className)} title={title} {...props} />
    {title && <span className={classNames(classes.all, classes.imgtitle)}>{title}</span>}
  </figure>
);

const ImageInline: React.SFC<WithStyles<typeof styles> & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>> = ({classes, title, className, ...props}) => (
  <img className={classNames(classes.all, classes.imginline, className)} title={title} {...props} />
);

const Image: React.SFC<WithStyles<typeof styles> & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {figure?: boolean}> = ({figure, ...props}) => {
  if (typeof props.alt === 'boolean') {
    delete props.alt
  }
  return figure ? ImageFigure(props) : ImageInline(props)
};

const Link: React.SFC<WithStyles<typeof styles> & React.HTMLProps<HTMLAnchorElement>> = ({classes, className, children, ...props}) => {
  return <a className={classNames(classes.all, classes.a, className)} {...props}>
    {children}
  </a>
};

// const tip: React.SFC<WithStyles<typeof styles> & React.HTMLProps<HTMLDivElement>> = ({classes, title = 'TIP', className, children, ...props}) => (
//   <div className={classNames(classes.all, classes.block, classes.tip, className)} {...props}>
//     <h4 className={classNames(classes.all, classes.blocktitle, classes.tiptitle, className)}>{title}</h4>
//     {children}
//   </div>
// );

// const warning: React.SFC<WithStyles<typeof styles> & React.HTMLProps<HTMLDivElement>> = ({classes, title = 'WARNING', className, children, ...props}) => (
//   <div className={classNames(classes.all, classes.block, classes.warning, className)} {...props}>
//     <h4 className={classNames(classes.all, classes.blocktitle, classes.warningtitle, className)}>{title}</h4>
//     {children}
//   </div>
// );

// const danger: React.SFC<WithStyles<typeof styles> & React.HTMLProps<HTMLDivElement>> = ({classes, title = 'DANGER', className, children, ...props}) => (
//   <div className={classNames(classes.all, classes.block, classes.danger, className)} {...props}>
//     <h4 className={classNames(classes.all, classes.blocktitle, classes.dangertitle, className)}>{title}</h4>
//     {children}
//   </div>
// );

const ContentComponents = {
  p: withClasses('p', 'all', 'p'),
  h1: withClasses('h1', 'all', 'h1'),
  h2: withClasses('h2', 'all', 'h2'),
  h3: withClasses('h3', 'all', 'h3'),
  h4: withClasses('h4', 'all', 'h4'),
  h5: withClasses('h5', 'all', 'h5'),
  h6: withClasses('h5', 'all', 'h5'),
  a: Link,
  ul: withClasses('ul', 'all', 'ul'),
  li: withClasses('li', 'all', 'li'),
  dl: withClasses('dl', 'all', 'dl'),
  dt: withClasses('dt', 'all', 'dt'),
  dd: withClasses('dd', 'all', 'dd'),
  pre: withClasses('pre', 'all', 'pre'),
  img: Image,
  blockquote: withClasses('blockquote', 'all', 'block', 'blockquote'),
  table: withClasses('table', 'all', 'table'),
  tr: withClasses('tr', 'all', 'tr'),
  th: withClasses('th', 'all', 'th'),
  td: withClasses('td', 'all', 'td'),
  // tip: tip,
  // warning: warning,
  // danger: danger
}

const ContentProvider: any = injectSheet(styles, {classNamePrefix: 'article-content-'})(({name, classes, ...props}: any) => {
  if (name in ContentComponents)
    return React.createElement(ContentComponents[name as keyof typeof ContentComponents], {classes, ...props});
  else
    return React.createElement(name, props);
});

const builtinComponentNames = {
  clippath: 'clipPath',
  fecolormatrix: 'feColorMatrix',
  fecomponenttransfer: 'feComponentTransfer',
  fecomposite: 'feComposite',
  feconvolvematrix: 'feConvolveMatrix',
  fediffuselighting: 'feDiffuseLighting',
  fedisplacementmap: 'feDisplacementMap',
  fedistantlight: 'feDistantLight',
  feflood: 'feFlood',
  fefunca: 'feFuncA',
  fefuncb: 'feFuncB',
  fefuncg: 'feFuncG',
  fefuncr: 'feFuncR',
  fegaussianblur: 'feGaussianBlur',
  feimage: 'feImage',
  femerge: 'feMerge',
  femergenode: 'feMergeNode',
  femorphology: 'feMorphology',
  feoffset: 'feOffset',
  fepointlight: 'fePointLight',
  fespecularlighting: 'feSpecularLighting',
  fespotlight: 'feSpotLight',
  fetile: 'feTile',
  feturbulence: 'feTurbulence',
  filter: 'filter',
  foreignobject: 'foreignObject',
  lineargradient: 'linearGradient',
  radialgradient: 'radialGradient',
  textpath: 'textPath'
}

interface ComponentNames {
  "a": "a",
  "abbr": "abbr",
  "address": "address",
  "area": "area",
  "article": "article",
  "aside": "aside",
  "audio": "audio",
  "b": "b",
  "base": "base",
  "bdi": "bdi",
  "bdo": "bdo",
  "big": "big",
  "blockquote": "blockquote",
  "body": "body",
  "br": "br",
  "button": "button",
  "canvas": "canvas",
  "caption": "caption",
  "cite": "cite",
  "code": "code",
  "col": "col",
  "colgroup": "colgroup",
  "data": "data",
  "datalist": "datalist",
  "dd": "dd",
  "del": "del",
  "details": "details",
  "dfn": "dfn",
  "dialog": "dialog",
  "div": "div",
  "dl": "dl",
  "dt": "dt",
  "em": "em",
  "embed": "embed",
  "fieldset": "fieldset",
  "figcaption": "figcaption",
  "figure": "figure",
  "footer": "footer",
  "form": "form",
  "h1": "h1",
  "h2": "h2",
  "h3": "h3",
  "h4": "h4",
  "h5": "h5",
  "h6": "h6",
  "head": "head",
  "header": "header",
  "hgroup": "hgroup",
  "hr": "hr",
  "html": "html",
  "i": "i",
  "iframe": "iframe",
  "img": "img",
  "input": "input",
  "ins": "ins",
  "kbd": "kbd",
  "keygen": "keygen",
  "label": "label",
  "legend": "legend",
  "li": "li",
  "link": "link",
  "main": "main",
  "map": "map",
  "mark": "mark",
  "menu": "menu",
  "menuitem": "menuitem",
  "meta": "meta",
  "meter": "meter",
  "nav": "nav",
  "noindex": "noindex",
  "noscript": "noscript",
  "object": "object",
  "ol": "ol",
  "optgroup": "optgroup",
  "option": "option",
  "output": "output",
  "p": "p",
  "param": "param",
  "picture": "picture",
  "pre": "pre",
  "progress": "progress",
  "q": "q",
  "rp": "rp",
  "rt": "rt",
  "ruby": "ruby",
  "s": "s",
  "samp": "samp",
  "script": "script",
  "section": "section",
  "select": "select",
  "small": "small",
  "source": "source",
  "span": "span",
  "strong": "strong",
  "style": "style",
  "sub": "sub",
  "summary": "summary",
  "sup": "sup",
  "table": "table",
  "tbody": "tbody",
  "td": "td",
  "textarea": "textarea",
  "tfoot": "tfoot",
  "th": "th",
  "thead": "thead",
  "time": "time",
  "title": "title",
  "tr": "tr",
  "track": "track",
  "u": "u",
  "ul": "ul",
  "var": "var",
  "video": "video",
  "wbr": "wbr",
  "webview": "webview",
  "svg": "svg",
  "animate": "animate",
  "animateTransform": "animateTransform",
  "circle": "circle",
  "clipPath": "clipPath",
  "defs": "defs",
  "desc": "desc",
  "ellipse": "ellipse",
  "feBlend": "feBlend",
  "feColorMatrix": "feColorMatrix",
  "feComponentTransfer": "feComponentTransfer",
  "feComposite": "feComposite",
  "feConvolveMatrix": "feConvolveMatrix",
  "feDiffuseLighting": "feDiffuseLighting",
  "feDisplacementMap": "feDisplacementMap",
  "feDistantLight": "feDistantLight",
  "feFlood": "feFlood",
  "feFuncA": "feFuncA",
  "feFuncB": "feFuncB",
  "feFuncG": "feFuncG",
  "feFuncR": "feFuncR",
  "feGaussianBlur": "feGaussianBlur",
  "feImage": "feImage",
  "feMerge": "feMerge",
  "feMergeNode": "feMergeNode",
  "feMorphology": "feMorphology",
  "feOffset": "feOffset",
  "fePointLight": "fePointLight",
  "feSpecularLighting": "feSpecularLighting",
  "feSpotLight": "feSpotLight",
  "feTile": "feTile",
  "feTurbulence": "feTurbulence",
  "filter": "filter",
  "foreignObject": "foreignObject",
  "g": "g",
  "image": "image",
  "line": "line",
  "linearGradient": "linearGradient",
  "marker": "marker",
  "mask": "mask",
  "metadata": "metadata",
  "path": "path",
  "pattern": "pattern",
  "polygon": "polygon",
  "polyline": "polyline",
  "radialGradient": "radialGradient",
  "rect": "rect",
  "stop": "stop",
  "switch": "switch",
  "symbol": "symbol",
  "text": "text",
  "textPath": "textPath",
  "tspan": "tspan",
  "use": "use",
  "view": "view"
}

export default new Proxy({}, {
  get: (_, key) => {
    key = typeof key === 'string' ? key.toLowerCase() : 'p';
    if (key in builtinComponentNames) {
      key = builtinComponentNames[key as keyof typeof builtinComponentNames];
    }
    return (props: React.Props<{}>) => {
      return React.createElement(ContentProvider, {
        ...props,
        name: key
      });
    }
  }
}) as ComponentNames & {img: React.SFC<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {figure?: boolean}>};