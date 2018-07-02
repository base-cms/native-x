import ApolloService from 'ember-apollo-client/services/apollo';
import { computed, get } from '@ember/object';
import { inject } from '@ember/service';
import { setContext } from 'apollo-link-context';
import { Promise } from 'rsvp';

export default ApolloService.extend({
  session: inject(),

  link: computed(function() {
    const httpLink = this._super(...arguments);
    const authMiddleware = setContext((req, ctx) => {
      return this._runAuthorize(req, ctx);
    });
    return authMiddleware.concat(httpLink);
  }),

  _runAuthorize() {
    const hash = localStorage.getItem('portal-hash');
    const headers = {};
    if (hash) headers['X-Portal-Hash'] = hash;
    if (!this.get('session.isAuthenticated')) {
      return { headers };
    }
    return new Promise((resolve) => {
      const data = this.get('session.data.authenticated.session');
      headers['Authorization'] = `Bearer ${get(data, 'token')}`;
      resolve({ headers })
    });
  }

});
