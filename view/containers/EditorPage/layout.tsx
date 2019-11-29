import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import AppBar from 'components/AppBar';
import Tabs from 'components/Tabs';
import { Styles } from 'jss';
import FormContainer from 'components/Form/FormContainer';
import TextFooter from 'components/TextFooter';

const styles: Styles = {
  root: {
    background: '#e3f2fd',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden'
  },
  card: {
    position: 'relative',
    zIndex: 2,
    marginBottom: '32px',
    marginTop: '0px',
    borderRadius: '4px',
    background: '#fff',
    boxShadow: 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px'
  },
  appbar: {
    position: 'relative',
    zIndex: 1
  },
  tabs: {
    display: 'flex',
    justifyContent: 'center',
    height: '48px',
    margin: '0 -30px',
    borderBottom: '1px solid #e0e0e0',
  },
  footer: {
    marginBottom: '32px'
  },
  [`@media (min-width: 770px)`]: {
    appbar: {
      paddingBottom: '128px'
    },
    card: {
      marginTop: '-48px'
    }
  }
};

interface IEditorLayoutProps {
  appbarleft: React.ReactNode;
  appbarright: React.ReactNode;
  tabnames: string[];
  tabvalue?: string;
  disabled?: boolean;
  onTabChange?: (name: string) => void;
}

const EditorLayout: React.SFC<IEditorLayoutProps & WithStyles<typeof styles>> = ({classes, appbarleft, appbarright, tabnames, tabvalue, onTabChange, disabled, children}) => (
  <div className={classnames(classes.root)}>
    <AppBar className={classes.appbar} left={appbarleft} right={appbarright}/>
    <FormContainer className={classes.card}>
      <Tabs className={classes.tabs} names={tabnames} value={tabvalue} onChange={onTabChange} disabled={disabled}></Tabs>
      {children}
    </FormContainer>
    <TextFooter className={classes.footer}>
      根据 <a href='https://www.gnu.org/licenses/agpl-3.0.html' target='_blank'>AGPL 许可证</a> 发布。Copyright © 2019 <a href='https://theform.app'>The Form</a>
    </TextFooter>
  </div>
);

export default injectSheet(styles)(EditorLayout);
