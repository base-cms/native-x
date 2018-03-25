const webpack = require('webpack');
const { resolve } = require('path');
const { getIfUtils, removeEmpty } = require('webpack-config-utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const pkg = require('./package');

const srcDir = resolve(__dirname, 'src');

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
        resolve(__dirname, 'node_modules'),
      ],
    },
    output: {
      filename: '[name].min.js',
      path: resolve(__dirname, 'dist'),
    },
    devServer: {
      port: process.env.SERVER_PORT || 3081,
      proxy: {
        '*': 'http://localhost:8100',
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
              presets: ['env'],
            },
          },
        },
      ]),
    },
    plugins: removeEmpty([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: ifProd('"production"', '"development"')
        }
      }),

      ifNotProd(new HtmlWebpackPlugin({
        template: resolve(__dirname, 'src/index.html'),
        inject: false,
      })),

      ifProd(new webpack.BannerPlugin({
        entryOnly: true,
        banner: `/*! FortnightJS v${pkg.version} */`,
        raw: true,
      })),

      ifProd(new UglifyJsPlugin({
        sourceMap: true,
        extractComments: {
          condition: /^\**!|@preserve|@license|@cc_on/,
          filename: (file) => `${file}.info`,
        },
      })),

    ]),
  };
};
