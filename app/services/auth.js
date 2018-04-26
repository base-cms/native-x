import Service from '@ember/service';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';

import checkSession from 'fortnight/gql/queries/check-session';
import deleteSession from 'fortnight/gql/mutations/delete-session';
import loginUser from 'fortnight/gql/mutations/login-user';

export default Service.extend(ObjectQueryManager, {
  /**
   * Checks the current session.
   *
   * @param {string} token
   * @return {Promise}
   */
  check(token) {
    const variables = {
      input: { token },
    };
    return this.get('apollo').watchQuery({ query: checkSession, variables, fetchPolicy: 'network-only' }, "checkSession").then((auth) => {
      this.set('response', auth);
      return auth;
    });
  },

  /**
   * Submits authentication credentials (logs a user in).
   *
   * @param {string} email
   * @param {string} password
   * @return {Promise}
   */
  submit(email, password) {
    const variables = {
      input: { email, password },
    };
    return this.get('apollo').mutate({ mutation: loginUser, variables }, "loginUser").then((auth) => {
      this.set('response', auth);
      return auth;
    })
  },

  /**
   * Deletes the current auth session token.
   *
   * @return {Promise}
   */
  delete() {
    return this.get('apollo').mutate({ mutation: deleteSession }, "deleteSession").then(() => {
      this.set('response', null);
    });
  },
});
