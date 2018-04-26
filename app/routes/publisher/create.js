import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'fortnight/gql/mutations/create-publisher';

export default Route.extend(RouteQueryManager, {

  model() {
    return { name: '' };
  },

  renderTemplate() {
    this.render();
    this.render('publisher.actions.create', { outlet: 'actions', into: 'application' });
  },

  actions: {
    create({ name, logo }) {
      const resultKey = 'createPublisher';
      const payload = { name, logo };
      const variables = { input: { payload } };
      const refetchQueries = ['publisher', 'AllPublishers'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('publisher.edit', response.id))
        .then(() => this.get('notify').info('Publisher created.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
