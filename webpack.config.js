const webpack = require('webpack');
const { resolve } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const srcDir = resolve(__dirname, 'src');
const nodeModules = resolve(__dirname, 'node_modules');

module.exports = function(env) {
  const { ifProd, ifNotProd } = getIfUtils(env);
  return {
    cache: ifNotProd(),
    entry: {
      app: [
        resolve(srcDir, 'App.jsx'),
        resolve(srcDir, 'styles/app.scss'),
      ],
    },
    devtool: ifProd('source-map', 'cheap-eval-source-map'),
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        srcDir,
        nodeModules,
      ],
    },
    output: {
      filename: '[name].[hash].min.js',
      path: resolve(__dirname, 'dist'),
      publicPath: '/',
    },
    devServer: {
      historyApiFallback: true,
      proxy: {
        '/graph': 'http://localhost:8937',
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
          include: [ srcDir ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
            },
          },
        },
        {
          test: /\.(s*)css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: function() {
                  return [require('precss'), require('autoprefixer')];
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ]),
    },
    plugins: removeEmpty([
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),

      new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html'),
        inject: true,
      }),
    ]),
  };
};
