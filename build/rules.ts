import path from 'path';
import { babelOptions, babelSSROptions } from './babel';

export const javascript = {
  test: /\.(js|jsx)?$/,
  exclude: [
    path.resolve(__dirname, "../node_modules")
  ],
  use: [
    {
      loader: 'babel-loader',
      options: babelOptions
    }
  ]
}

export const javascriptSSR = {
  test: /\.(js|jsx)?$/,
  exclude: [
    path.resolve(__dirname, "../node_modules")
  ],
  use: [
    {
      loader: 'babel-loader',
      options: babelSSROptions
    }
  ]
}

export const typescript = {
  test: /\.(ts|tsx)?$/,
  use: [
    {
      loader: 'babel-loader',
      options: babelOptions
    },
    {
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname, '../view/tsconfig.json')
      }
    }
  ]
}

export const typescriptSSR = {
  test: /\.(ts|tsx)?$/,
  use: [
    {
      loader: 'babel-loader',
      options: babelSSROptions
    },
    {
      loader: 'ts-loader',
      options: {
        configFile: path.resolve(__dirname, '../view/tsconfig.json')
      }
    }
  ]
}

export const css = {
  test: /\.css$/,
  use: [
    'to-string-loader',
    {
      loader:'css-loader',
      options: {
        importLoaders: 1
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-preset-env')(),
          require('cssnano')()
        ]
      }
    }
  ]
}

export const image = {
  test: /\.(png|jpg|jpeg|gif|bmp)$/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 8192,
      name: '[path][name].[ext]',
      outputPath: 'images/',
      esModule: false
    }
  }]
}

export const performanceAssetFilter = (assetFilename: string) => {
  return assetFilename.endsWith('.js');
}