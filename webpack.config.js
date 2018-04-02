const webpack = require('webpack');
const { resolve } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = resolve(__dirname, 'src');

module.exports = function(env) {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    cache: ifNotProd(),
    entry: {
      'fortnight-web': [
        resolve(srcDir, 'index.js'),
      ],
    },
    devtool: ifProd('source-map', 'cheap-eval-source-map'),
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        srcDir,
        resolve(__dirname, 'node_modules'),
      ],
    },
    output: {
      filename: '[name].min.js',
      path: resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    // devServer: {},
    module: {
      rules: removeEmpty([
        {
          test: /\.jsx?$/,
          include: [ srcDir ],
          enforce: 'pre',
          loader: 'eslint-loader',
        },
        {
          test: /\.jsx?$/,
          include: [ srcDir ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
            },
          },
        },
      ]),
    },
    plugins: removeEmpty([
      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html'),
        inject: true,
      }),
    ]),
  };
};
