import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';
import withApollo from './WithApollo';

const config = (req) => {
  const headers = req ? req.headers : {};
  const host = (req) ? req.ROOT_URI : '';
  return {
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
        uri: `${host}/graph`,
        headers,
        fetch,
      }),
    ]),
  };
};

export default withApollo(config);
