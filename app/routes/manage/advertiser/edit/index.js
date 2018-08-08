import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/advertiser/edit/index';

export default Route.extend(RouteQueryManager, {
  model() {
    const id = this.modelFor('manage.advertiser.edit').get('id');
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'advertiser');
  },
});
