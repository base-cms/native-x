const proxy = require('http-proxy-middleware');
const index = require('./root');
const story = require('./story');

const { ROOT_URI } = process.env;

module.exports = (server, client) => {
  server.use('/', index(client));
  server.use('/story', story(client));
  server.use('/graph', proxy({
    target: `${ROOT_URI}/graph`,
    changeOrigin: true,
  }));
};
