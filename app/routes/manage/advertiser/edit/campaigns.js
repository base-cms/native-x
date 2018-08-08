import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { getObservable } from 'ember-apollo-client';

import query from 'fortnight/gql/queries/advertiser/edit/campaigns';

export default Route.extend(RouteQueryManager, {
  queryParams: {
    first: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
  },

  model({ first, sortBy, ascending }) {
    const controller = this.controllerFor(this.get('routeName'));

    const id = this.modelFor('manage.advertiser.edit').get('id');
    const input = { id };

    const pagination = { first };
    const sort = { field: sortBy, order: ascending ? 1 : -1 };

    const variables = {
      input,
      pagination,
      sort,
    };
    if (!sortBy) delete variables.sort.field;

    const resultKey = 'advertiser';
    controller.set('resultKey', resultKey);
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey)
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      }).catch(e => this.get('graphErrors').show(e))
    ;
  },
});

