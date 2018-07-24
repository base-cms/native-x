import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { getObservable } from 'ember-apollo-client';

import query from 'fortnight/gql/queries/publisher/edit/placements';

export default Route.extend(RouteQueryManager, {
  model() {
    const controller = this.controllerFor(this.get('routeName'));

    const id = this.modelFor('manage.publisher.edit').get('id');
    const input = { id };
    const variables = {
      input,
      pagination: { first: 20 },
      sort: { field: 'updatedAt', order: -1 },
    };

    const resultKey = 'publisher';
    controller.set('resultKey', resultKey);
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey)
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      }).catch(e => this.get('graphErrors').show(e))
    ;
  },
});

