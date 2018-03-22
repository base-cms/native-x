import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'fortnight/gql/mutations/create-advertiser';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    return { name: '' };
  },
  actions: {
    create({ name }) {
      const variables = { input: { payload: { name } } };
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
