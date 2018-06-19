import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/advertiser/hash';

export default Route.extend(RouteQueryManager, {
  model({ hash }) {
    const variables = { input: { hash } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'advertiserHash');
  },
});

