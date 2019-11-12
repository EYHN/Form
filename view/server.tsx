import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import App from 'containers/App';
import { SheetsRegistry, JssProvider } from 'react-jss';
import { StaticRouter, StaticRouterContext } from 'react-router';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack'
import fs from 'fs-extra';
import path from 'path';
import { jss } from 'styles';
import configureStore from 'store';
import { Provider } from 'react-redux';
import { END } from 'redux-saga';

const preloadPromise = Loadable.preloadAll();

const STATS_FILENAME = 'loadable-manifest.json';

let stats: any = null

export const render = async (location: string, __dirname: string) => {
  await preloadPromise;
  const initialState = {};
  const store = configureStore(initialState);

  const sheets = new SheetsRegistry();
  const routerContext: StaticRouterContext = {};
  const modules = [] as any[];
  const element =
    <Loadable.Capture report={moduleID => modules.push(moduleID)}>
      <Provider store={store}>
        <StaticRouter location={location} context={routerContext}>
          <JssProvider registry={sheets} jss={jss}>
            <App />
          </JssProvider>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>;

  modules.splice(0, modules.length);
  const html = ReactDOMServer.renderToString(element);

  const helmet = Helmet.renderStatic();

  if (!stats) {
    stats = JSON.parse(await fs.readFile(path.resolve(__dirname, STATS_FILENAME), 'utf8'))
  }
  
  const bundles = getBundles(stats, modules);

  store.dispatch(END);

  return `
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${helmet.style.toString()}
      <style>${sheets.toString()}</style>
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="app">${html}</div>
      <script>window.initialState = ${JSON.stringify(store.getState())}</script>
      ${bundles.map(bundle => {
      if (typeof bundle.file === 'string' && bundle.file.endsWith('.js')) {
        return `<script type="text/javascript" src="${bundle.publicPath}"></script>`
      }
      return '';
      // alternatively if you are using publicPath option in webpack config
      // you can use the publicPath value from bundle, e.g:
      // return `<script src="${bundle.publicPath}"></script>`
    }).join('\n')}
      <script type="text/javascript" src="/bundle.js"></script>
    </body>
  </html>
  `;
};
