const proxy = require('http-proxy-middleware');
const index = require('./root');
const story = require('./story');

const { GRAPH_PROXY } = process.env;

module.exports = (server, client) => {
  server.use('/', index(client));
  server.use('/story', story(client));
  server.use('/graphql', proxy({
    target: `${GRAPH_PROXY}/graph`,
    changeOrigin: true,
  }));
};
