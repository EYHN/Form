import React from 'react';
import injectSheet, { WithStyles } from "react-jss";
import classNames from 'classnames';
import { Styles } from 'jss';
import ToolBar from 'components/ToolBar/ToolBar';

const styles: Styles = {
  editorItem: {
    paddingTop: '24px',
    paddingBottom: '32px'
  },
  toolbar: {
    flexDirection: 'row-reverse',
    marginTop: '16px',
    marginBottom: '-32px',
    marginRight: '-30px',
    paddingRight: '30px',
    minHeight: 64,
    borderTop: '1px solid #e0e0e0'
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
    {toolbar && <ToolBar className={classes.toolbar}>
      {toolbar}
    </ToolBar>}
  </Component>
)

export default injectSheet(styles)(EditorItem)
