import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: '/graph',
  request: op => op.setContext({ headers: { 'X-Tenant-Key': 'as3_baseplatform' } }),
});

export default client;
