const { HttpLink } = require('apollo-link-http');
const fetch = require('isomorphic-unfetch');
const {
  makeRemoteExecutableSchema,
  introspectSchema,
} = require('graphql-tools');
const env = require('../env');

const { GRAPHQL_URI } = env;

const link = new HttpLink({
  uri: `${GRAPHQL_URI}/graph`,
  fetch,
});

module.exports = async () => {
  const schema = await introspectSchema(link);
  return makeRemoteExecutableSchema({
    schema,
    link,
  });
};
