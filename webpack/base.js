/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
};

const vendor = {
  bowser: [path.resolve(paths.src, 'bowser.js')],
  react: [
    'react',
    'react-dom',
    'react-router',
    'react-slick',
  ],
  redux: [
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-actions',
    'react-router-redux',
  ],
  other: [
    'classnames',
    'axios',
    'lodash',
    'moment',
    'recompose',
    'reselect',
  ],
};

const baseConfig = {
  context: paths.src,
  entry: vendor,
  output: {
    path: paths.dist,
    filename: '[name].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      core: path.resolve(paths.src, 'core'),
      assets: path.resolve(paths.src, 'assets'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file-loader?name=images/[name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 7,
            },
            pngquant: {
              quality: '75',
              speed: 3,
            },
          },
        }],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: Object.keys(vendor).concat('manifest'),
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './favicon.ico',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};

module.exports = baseConfig;
