import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/account';

export default Route.extend(RouteQueryManager, {
  model() {
    return this.get('apollo').watchQuery({ query, fetchPolicy: 'network-only' }, 'account');
  },
});
