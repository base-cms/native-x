const path = require('path');
const { Router } = require('express');
const { renderTemplate } = require('../handlebars');

const router = Router();

module.exports = (client) => {
  router.get('/favicon.ico', (req, res) => {
    const file = path.resolve(__dirname, '../../static/favicon.ico');
    client.serveStatic(req, res, file);
  });

  router.get('/robots.txt', (req, res) => {
    const { protocol, host } = req;
    const uri = `${protocol}://${host}`;
    const txt = renderTemplate('robots.txt.hbs', { uri });
    res.set('Content-Type', 'text/plain; charset=UTF-8');
    res.send(txt);
  });

  return router;
};
