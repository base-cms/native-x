const index = require('./root');

module.exports = (server, client) => {
  server.use('/', index(client));
};
