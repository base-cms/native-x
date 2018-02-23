import ApolloService from 'ember-apollo-client/services/apollo';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default ApolloService.extend({
  /**
   * The current user sesion.
   */
  session: inject(),

  /**
   * Registers middlewares to run before the Graph API Fetch request is made.
   */
  middlewares: computed(function() {
    return [
      { applyMiddleware: (req, next) => this.authorize(req, next) }
    ];
  }),

  /**
   * Adds authorization headers to outgoing Graph API Fetch requests.
   * Will only be added if there is currently an authenticated session.
   * Note: this will NOT add auth headers to the `checkSession` query, as
   * the auth token is required as an input parameter in that case.
   *
   * @param {Object} req
   * @param {Function} next
   */
  authorize(req, next) {
    if (this.get('session.isAuthenticated')) {
      this.get('session').authorize('authorizer:application', (headerName, headerContent) => {
        if (!req.options.headers) {
          req.options.headers = {};
        }
        req.options.headers[headerName] = headerContent;
        next();
      });
    } else {
      next();
    }
  }
});
