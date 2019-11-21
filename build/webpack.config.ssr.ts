import path from 'path';
import webpack from 'webpack';
import { image, css, typescriptSSR, performanceAssetFilter } from './rules';
const ReactLoadablePlugin = require(path.resolve(__dirname, '../tools/loadable/webpack')).ReactLoadablePlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const clientconfig: webpack.Configuration = {
  name: 'The Form',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: path.resolve(__dirname, '../view/'),
  target: 'web',
  entry: [
    path.resolve(__dirname, '../view/hydrate.tsx')
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist/ssr/client/')
  },

  devtool: 'source-map',

  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: './stats.html'
    }),
    new webpack.DefinePlugin({
      API_SERVER: JSON.stringify('')
    })
  ],

  resolve: {
    alias: {
      'react-loadable': path.resolve(__dirname, '../tools/loadable')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, '../view'), 'node_modules']
  },

  module: {
    rules: [
      typescriptSSR,
      css,
      image
    ]
  },
  devServer: {
    port: parseInt(process.env.PORT) || 8888,
    host: 'localhost',
    publicPath: '/',
    contentBase: path.resolve(__dirname, '../view'),
    historyApiFallback: true,
    open: true,
    headers: {
      'access-control-allow-origin': '*'
    }
  },
  performance: {
    assetFilter: performanceAssetFilter,
    maxAssetSize: 300000,
    maxEntrypointSize: 300000
  },
  node: {
    __dirname: true,
    __filename: true
  }
};

const serverconfig: webpack.Configuration = {
  name: 'The Form',
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: path.resolve(__dirname, '../view/'),
  target: 'node',
  entry: [
    path.resolve(__dirname, '../view/server.tsx')
  ],
  output: {
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist/ssr/server')
  },

  devtool: 'source-map',

  plugins: [
    new ReactLoadablePlugin({
      filename: 'loadable-manifest.json',
    }),
    new webpack.DefinePlugin({
      API_SERVER: JSON.stringify('')
    })
  ],

  resolve: {
    alias: {
      'react-loadable': path.resolve(__dirname, '../tools/loadable')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, '../view'), 'node_modules']
  },

  module: {
    rules: [
      typescriptSSR,
      css,
      image
    ]
  },
  performance: {
    assetFilter: performanceAssetFilter,
    maxAssetSize: 300000,
    maxEntrypointSize: 300000
  },
  node: {
    __dirname: true,
    __filename: true
  }
};

export default [serverconfig, clientconfig];