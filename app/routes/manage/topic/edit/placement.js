import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/topic/edit/placements';

export default Route.extend(RouteQueryManager, {
  model() {
    const id = this.modelFor('manage.topic.edit').get('id');
    const input = { id };
    const variables = {
      input,
      placementPagination: { first: 10 },
      placementSort: { field: 'updatedAt', order: -1 },
    };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'topic');
  },
});

