const path = require('path');
const { Router } = require('express');
const { renderTemplate } = require('../handlebars');
const asyncRoute = require('../utils/async-route');
const graphql = require('../graph/client');

const router = Router();

module.exports = (client) => {
  router.get('/favicon.ico', (req, res) => {
    const file = path.resolve(__dirname, '../../static/favicon.ico');
    client.serveStatic(req, res, file);
  });

  router.get('/robots.txt', asyncRoute(async (req, res) => {
    const source = `
      query Account {
        account {
          id
          storyUri
        }
      }
    `;
    const account = await graphql({ source }, 'account');
    const { storyUri } = account;
    const txt = renderTemplate('robots.txt.hbs', { uri: storyUri });
    res.set('Content-Type', 'text/plain; charset=UTF-8');
    res.send(txt);
  }));

  router.get('/sitemap.xml', asyncRoute(async (req, res) => {
    const source = `
      query Sitemap {
        storySitemap {
          id
          loc
          lastmod
          changefreq
          priority
        }
      }
    `;
    const items = await graphql({ source }, 'storySitemap');
    const xml = renderTemplate('sitemap.xml.hbs', { items });
    res.set('Content-Type', 'text/xml; charset=UTF-8');
    res.send(xml);
  }));

  return router;
};
