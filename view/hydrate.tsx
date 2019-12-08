import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom'
import { jss } from 'styles';
import { JssProvider } from 'react-jss';
import { Provider } from 'react-redux';
import configureStore from 'store';
import WithBetaDialog from 'containers/BetaDialog/withBetaDialog';

const MOUNT_NODE = document.getElementById('app');

const initialState = (window as any).initialState || {};
const store = configureStore(initialState);

const render = (Content: React.ComponentType) => {
  const element = 
    <Provider store={store}>
      <BrowserRouter>
        <JssProvider jss={jss}>
          <WithBetaDialog>
            <Content />
          </WithBetaDialog>
        </JssProvider>
      </BrowserRouter>
    </Provider>;
  
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      element
      , MOUNT_NODE
    );
  })
};

render(App);
