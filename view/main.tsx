import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';
import {BrowserRouter} from 'react-router-dom';
import { JssProvider } from 'react-jss';
import { jss } from 'styles';
import { Provider } from 'react-redux';
import configureStore from 'store';
import WithBetaDialog from 'containers/BetaDialog/withBetaDialog';

const MOUNT_NODE = document.body;

const root = document.createElement('div');
root.id = 'app';
MOUNT_NODE.appendChild(root);

const initialState = {};
const store = configureStore(initialState);

const render = (Content: React.ComponentType) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <JssProvider jss={jss}>
          <WithBetaDialog>
            <Content />
          </WithBetaDialog>
        </JssProvider>
      </BrowserRouter>
    </Provider>
    , root
  );
};

render(App);

if (module.hot) {
  module.hot.accept(['./containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(require('./containers/App').default);
  });
}
