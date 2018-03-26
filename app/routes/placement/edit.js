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

  renderTemplate() {
    this.render();
    this.render('placement.actions.edit', { outlet: 'actions', into: 'application' });
  },

  actions: {
    update({ id, name, publisher }) {
      const resultKey = 'updatePlacement';
      const publisherId = publisher.id;
      const payload = { name, publisherId };
      const variables = { input: { id, payload } };
      const refetchQueries = ['placement', 'AllPlacements'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.get('notify').info('Placement saved.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
