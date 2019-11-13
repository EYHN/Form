import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CONFIG from '../config';
import { image, css, typescript, performanceAssetFilter } from './rules';

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const HtmlWebpackConfig: HtmlWebpackPlugin.Options = {
  title: CONFIG.site.name,
  filename: 'index.html',
  hash: true,
  showErrors: true
}

const config: webpack.Configuration = {
  name: CONFIG.site.name,
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  context: path.resolve(__dirname, '../view/'),
  target: 'web',
  entry: [
    path.resolve(__dirname, '../view/main.tsx')
  ],
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist/csr/')
  },

  devtool: 'source-map',

  plugins: [
    new HtmlWebpackPlugin(HtmlWebpackConfig),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static',
      reportFilename: './stats.html'
    }),
    new webpack.DefinePlugin({
      API_SERVER: JSON.stringify('http://localhost:3000')
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
      typescript,
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

export default config;