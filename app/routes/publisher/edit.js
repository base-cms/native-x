import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/publisher';
import mutation from 'fortnight/gql/mutations/update-publisher';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model({ id }) {
    const resultKey = 'publisher';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  renderTemplate() {
    this.render();
    this.render('publisher.actions.edit', { outlet: 'actions', into: 'application' });
  },

  actions: {
    update({ id, name, logo }) {
      const resultKey = 'updatePublisher';
      const payload = { name, logo };
      const variables = { input: { id, payload } };
      const refetchQueries = ['publisher', 'AllPublishers'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.get('notify').info('Publisher saved.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
