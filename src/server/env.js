const { isURL } = require('validator');

const {
  port,
  cleanEnv,
  makeValidator,
} = require('envalid');

const url = makeValidator((v) => {
  const opts = { protocols: ['http', 'https'], require_tld: false, require_protocol: true };
  if (isURL(v, opts)) return v;
  throw new Error('Expected a valid URL with http or https');
});

module.exports = cleanEnv(process.env, {
  PORT: port({ desc: 'The port that express will run on.', default: 3005 }),
  GRAPHQL_URI: url({ desc: 'The GraphQL URI for proxying/stitching API requests. Should follow the https://[account_key].[domain].[tld] structure in production.' }),
});
