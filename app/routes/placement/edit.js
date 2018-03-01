import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/placement';
import mutation from 'fortnight/gql/mutations/update-placement';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model({ id }) {
    const resultKey = 'placement';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  actions: {
    update({ id, name, publisher }) {
      const resultKey = 'updatePlacement';
      const publisherId = publisher.id;
      const payload = { name, publisherId };
      const variables = { input: { id, payload } };
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .then(() => this.refresh())
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
