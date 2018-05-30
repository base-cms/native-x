import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';
import withApollo from './WithApollo';

// @todo This will need to be dynamically switched?
const headers = {
  'X-Tenant-Key': 'cygnus_fhc',
  Authorization: 'Bearer 1fd5a684-2e95-43fe-b0da-861d78c6c567',
};

const config = {
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // eslint-disable-next-line no-console
        graphQLErrors.map(({ message, locations, path }) => console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));
      }
      // eslint-disable-next-line no-console
      if (networkError) console.error(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'https://base4.as3.io/graph',
      headers,
      fetch,
    }),
  ]),
};

export default withApollo(config);
