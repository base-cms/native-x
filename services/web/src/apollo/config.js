import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import fetch from 'isomorphic-unfetch';

export default (req) => {
  const headers = req ? req.headers : {};
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const uri = (req) ? `${protocol}://${req.get('host')}` : '';
  // if (headers.host) {
  //   headers['x-forwarded-host'] = headers.host;
  //   delete headers.host;
  // }
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
        uri: `${uri}/graph`,
        headers,
        fetch,
      }),
    ]),
  };
};
