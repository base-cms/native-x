import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/placement';

export default Route.extend(RouteQueryManager, {
  model({ placement_id }) {
    const variables = { input: { id: placement_id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'placement');
  },
});

