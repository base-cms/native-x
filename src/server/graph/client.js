const { graphql } = require('graphql');
const createSchema = require('./schema');

module.exports = async (options = {}, resultKey) => {
  const schema = await createSchema();
  return graphql({ ...options, schema }).then(res => (resultKey ? res.data[resultKey] : res.data));
};
