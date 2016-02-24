const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const root = p => path.join(__dirname, p)
const trace = loader => `${root('output-tracer.js')}!${loader}!${root('input-tracer.js')}`
const scan = (extensions) => {
  var files = [];
  extensions.forEach(extension => {
    glob
      .sync(`src/**/*.${extension}`)
      .forEach(file => files.push({from: file, to: file.replace('src/', '')}))
  });
  return files;
}

process.env.ENV = process.env.NODE_ENV = 'development';

console.log('webpack.config.js..()', process.env.ENV, JSON.stringify(process.env.ENV));

module.exports = {
  devtool: 'source-map',
  debug: true,

  entry: {
    app: root('src/Boot.tsx'),
    vendors: ['es6-shim', 'jquery', 'react', 'react-dom', 'react-router', 'react-router-redux', 'history', 'redux', 'redux-thunk']
  },

  output: {
    path: root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: ['', '.foo', '.ejs', '.ts', '.tsx', '.js', '.json', '.css', '.html']
  },

  module: {
    preLoaders: [
      {test: /\.js$/, loader: "source-map-loader"}
    ],
    loaders: [
      {test: /\.(ts|tsx)$/, loader: 'ts-loader!replacer-loader?o=src&r=src.electron'},
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.html$/, loader: 'raw'}
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js', minChunks: Infinity}),
    new CopyWebpackPlugin(scan(['ico', 'svg', 'jpg'])),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/Index.ejs',
      inject: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(process.env.ENV),
        'NODE_ENV': JSON.stringify(process.env.ENV)
      }
    }),
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ]
};
