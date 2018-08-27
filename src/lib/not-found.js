const { isArray } = Array;

/**
 * @todo This should use better error detection via ApolloError.
 * This requires Apollo Server 2.0, however.
 * @see https://www.apollographql.com/docs/apollo-server/features/errors.html
 *
 * @param {Error} e
 */
const isNotFound = e => isArray(e.graphQLErrors)
  && e.graphQLErrors[0].message
  && /found for ID/i.test(e.graphQLErrors[0].message);

export default isNotFound;
