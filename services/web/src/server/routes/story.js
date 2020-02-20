const { Router } = require('express');

const router = Router();

module.exports = (client) => {
  router.get('*', (req, res) => {
    // Search path parts until an ID is found.
    const parts = req.path.split('/');
    const id = parts.find(part => /[a-f0-9]{24}/.test(part));
    if (!id) {
      client.render(req, res, '_error');
    } else {
      const actualPage = '/story';
      const publisherId = req.query.pubid || null;
      const props = { id, publisherId };
      client.render(req, res, actualPage, props);
    }
  });
  return router;
};
