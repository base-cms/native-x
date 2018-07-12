const { EnvironmentPlugin } = require('webpack');

module.exports = {
  distDir: '../.next/build',

  webpack: (config, { dev }) => {
    config.plugins.push(new EnvironmentPlugin(['NODE_ENV', 'GRAPH_PROXY']));

    if (dev) {
      config.module.rules.push({
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: dev,
        },
      });
    }
    return config;
  },
};
