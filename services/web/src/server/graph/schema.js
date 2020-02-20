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

let promise;
module.exports = async () => {
  const build = async () => {
    const schema = await introspectSchema(link);
    return makeRemoteExecutableSchema({
      schema,
      link,
    });
  };
  if (!promise) {
    // Prevents the introspection from happening more than once.
    // What happens, though, when the remote schema updates?
    // This would cache the schema and would require a reload of the app.
    promise = build();
  }
  return promise;
};
