import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'fortnight/gql/mutations/create-advertiser';

export default Route.extend(RouteQueryManager, {

  model() {
    return { name: '' };
  },

  renderTemplate() {
    this.render();
    this.render('advertiser.actions.create', { outlet: 'actions', into: 'application' });
  },

  actions: {
    create({ name, logo }) {
      const variables = { input: { payload: { name, logo } } };
      const resultKey = 'createAdvertiser';
      const refetchQueries = ['advertiser', 'AllAdvertisers'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('advertiser.edit', response.id))
        .then(() => this.get('notify').info('Advertiser created.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
