import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';

const styles: Styles = {
  editorItem: {
    paddingTop: '24px',
    paddingBottom: '32px'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row-reverse',
    marginTop: '16px',
    marginBottom: '-32px',
    marginRight: '-30px',
    paddingRight: '30px',
    minHeight: '65px',
    borderTop: '1px solid #e0e0e0',
    fontSize: '0.9em',
    fontWeight: 600,
    '&>*' : {
      marginLeft: '24px'
    }
  },
  disabled: {
    color: '#545454'
  }
}

interface IEditorItemProps {
  className?: string;
  component?: React.ReactType<{className: string}>;
  toolbar?: React.ReactNode;
  disabled?: boolean;
}

const EditorItem: React.SFC<IEditorItemProps & WithStyles<typeof styles>> = ({classes, className, children, toolbar, disabled, component: Component = 'div'}) => (
  <Component className={classNames(classes.editorItem, disabled && classes.disabled, className)}>
    {children}
    {toolbar && <div className={classes.toolbar}>
      {toolbar}
    </div>}
  </Component>
)

export const EditorItemToolbarSeparator = () => (
  <div style={{
    borderLeft: '1px solid #e0e0e0',
    height: '32px',
    width: 0
  }} />
);

export default injectSheet(styles)(EditorItem)
