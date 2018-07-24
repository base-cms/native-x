import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/topic/edit';

export default Route.extend(RouteQueryManager, {
  model({ topic_id }) {
    const variables = { input: { id: topic_id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'topic');
  },
});

