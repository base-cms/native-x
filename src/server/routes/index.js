const proxy = require('http-proxy-middleware');
const index = require('./root');
const story = require('./story');

module.exports = (server, client) => {
  server.use('/', index(client));
  server.use('/story', story(client));
  server.use('/graphql', proxy({
    target: 'https://southcomm.native-x.io/graph',
    changeOrigin: true,
  }));
};
