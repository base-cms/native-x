const webpack = require('webpack');
const { resolve } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const srcDir = resolve(__dirname, 'src');
const nodeModules = resolve(__dirname, 'node_modules');

module.exports = function(env) {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    cache: ifNotProd(),
    entry: {
      'fortnight': [
        resolve(srcDir, 'index.js'),
      ],
    },
    devtool: ifProd('source-map', 'cheap-eval-source-map'),
    resolve: {
      extensions: ['.js', '.json'],
      modules: [
        srcDir,
        nodeModules,
      ],
    },
    output: {
      filename: '[name].min.js',
      path: resolve(__dirname, 'dist'),
    },
    devServer: {
      proxy: {
        '*': process.env.PROXY,
      },
    },
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
          include: [ srcDir, resolve(nodeModules, 'dom-utils'), resolve(nodeModules, 'intersection-observer') ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  modules: false,
                  debug: true,
                }],
              ],
              plugins: [require('babel-plugin-transform-object-assign')],
            },
          },
        },
      ]),
    },
    plugins: removeEmpty([
      ifNotProd(new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html'),
        inject: false,
      })),

      ifProd(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
      })),

    ]),
  };
};
