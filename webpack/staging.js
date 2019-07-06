/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const webpackConfig = require('./base.js');

const extractCSS = new ExtractTextPlugin('styles.css');
const svgoConfig = JSON.stringify({
  plugins: [
    { removeTitle: true },
    { convertColors: { shorthex: false } },
    { convertPathData: false },
  ],
});

// FIX: prevent including full lodash code to the bundle
webpackConfig.entry.bundle = ['babel-polyfill', './index.jsx'];
webpackConfig.plugins = webpackConfig.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('staging'),
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin(),
  new Visualizer(),
  extractCSS,
]);
webpackConfig.module.rules = webpackConfig.module.rules.concat([
  {
    test: /\.jsx?$/,
    include: /src/,
    loader: 'babel-loader',
  },
  {
    test: /\.s?css$/,
    loader: extractCSS.extract(['css-loader', 'sass-loader']),
  },
  {
    test: /\.svg$/,
    loader: `babel-loader!svg-react-loader!svgo-loader?${svgoConfig}`,
  },
]);


module.exports = webpackConfig;
