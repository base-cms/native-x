const helmet = require('helmet');
const { Router } = require('express');
const { ApolloServer } = require('apollo-server-express');
const createSchema = require('../graph/schema');

const router = Router();

const create = async () => {
  const schema = await createSchema();
  router.use(helmet.noCache());
  const server = new ApolloServer({ schema });
  server.applyMiddleware({ app: router, path: '/' });
};

create();

module.exports = router;
