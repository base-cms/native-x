const { HttpLink } = require('apollo-link-http');
const fetch = require('isomorphic-unfetch');
const {
  makeRemoteExecutableSchema,
  introspectSchema,
} = require('graphql-tools');

const { ROOT_URI } = process.env;

const link = new HttpLink({
  uri: `${ROOT_URI}/graph`,
  fetch,
});

module.exports = async () => {
  const schema = await introspectSchema(link);
  return makeRemoteExecutableSchema({
    schema,
    link,
  });
};
