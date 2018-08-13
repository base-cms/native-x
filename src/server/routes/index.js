const index = require('./root');
const graph = require('./graph');
const story = require('./story');

module.exports = (server, client) => {
  server.use('/', index(client));
  server.use('/story', story(client));
  server.use('/graph', graph);
};
