import React from 'react';
import injectSheet, { WithStyles } from 'react-jss';
import classnames from 'classnames';
import AppBar from 'components/AppBar';
import Tabs from 'components/Tabs';
import { Styles } from 'jss';
import FormContainer from 'components/Form/FormContainer';

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
    marginBottom: '64px',
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
  </div>
);

export default injectSheet(styles)(EditorLayout);
