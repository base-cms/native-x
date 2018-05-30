const next = require('next');
const loadServer = require('./src/server');

const dev = process.env.NODE_ENV !== 'production';
const client = next({ dev, dir: './src' });

client.prepare().then(() => loadServer(client)).catch((ex) => {
  // eslint-disable-next-line no-console
  console.error(ex.stack);
  process.exit(1);
});
