/* eslint-disable import/no-extraneous-dependencies */

require('dotenv').config();
const webpack = require('webpack');
const webpackConfig = require('./base.js'); // eslint-disable-line
const backendPort = process.env.BACKEND_PORT || 3000;

webpackConfig.entry.bundle = [
  'webpack-dev-server/client?http://localhost:8080',
  'webpack/hot/only-dev-server',
  './index.jsx',
];

webpackConfig.output.publicPath = 'http://localhost:8080/';

webpackConfig.devServer = {
  hot: true,
  inline: true,
  stats: 'minimal',
  historyApiFallback: {
    disableDotRule: true,
  },
  proxy: [
    { // local inkskill-koa
      context: ['/api/**'],
      target: `http://localhost:${backendPort}`,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
  ],
};

webpackConfig.devtool = '#inline-source-map';
webpackConfig.plugins = webpackConfig.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
]);
webpackConfig.module.rules = webpackConfig.module.rules.concat([
  {
    test: /\.jsx?$/,
    include: /src/,
    use: ['babel-loader?presets[]=react'],
  },
  {
    test: /\.s?css$/,
    use: [{
      loader: 'style-loader',
    }, {
      loader: 'css-loader', options: { sourceMap: true },
    }, {
      loader: 'sass-loader', options: { sourceMap: true },
    }],
  },
  {
    test: /\.svg$/,
    use: ['babel-loader', 'svg-react-loader'],
  },
]);

module.exports = webpackConfig;
