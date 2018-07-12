const express = require('express');
const helmet = require('helmet');
const routes = require('./routes');

const { PORT, ROOT_URI } = process.env;

const applyProxy = (req, res, next) => {
  req.ROOT_URI = ROOT_URI;
  next();
};

const server = express();
server.use(applyProxy)
server.use(helmet());

module.exports = (client) => {
  const handle = client.getRequestHandler();

  routes(server, client);

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(PORT, (err) => {
    if (err) throw err;
    // eslint-disable-next-line no-console
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};
