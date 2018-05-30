const path = require('path');
const { Router } = require('express');

const router = Router();

module.exports = (client) => {
  router.get('/favicon.ico', (req, res) => {
    const file = path.resolve(__dirname, '../../static/favicon.ico');
    client.serveStatic(req, res, file);
  });
  return router;
};
