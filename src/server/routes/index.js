const proxy = require('http-proxy-middleware');
const index = require('./root');
const story = require('./story');

const { HYDRA_GRAPH_URL, HYDRA_API_KEY } = process.env;

module.exports = (server, client) => {
  server.use('/', index(client));
  server.use('/story', story(client));
  server.use('/graphql', proxy({
    target: HYDRA_GRAPH_URL,
    changeOrigin: true,
    auth: `${HYDRA_API_KEY}:jellies`,
  }));
};
