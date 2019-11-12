import path from 'path';

export const babelOptions = {
  babelrc: false,
  presets: [
    path.resolve(__dirname, '../node_modules/@babel/preset-env'),
    path.resolve(__dirname, '../node_modules/@babel/preset-react')
  ],
  plugins: [
    path.resolve(__dirname, '../node_modules/@babel/plugin-transform-runtime')
  ]
}

export const babelSSROptions = {
  babelrc: false,
  presets: [
    path.resolve(__dirname, '../node_modules/@babel/preset-env'),
    path.resolve(__dirname, '../node_modules/@babel/preset-react')
  ],
  plugins: [
    path.resolve(__dirname, '../tools/loadable/babel'),
    path.resolve(__dirname, '../node_modules/@babel/plugin-transform-runtime')
  ]
}