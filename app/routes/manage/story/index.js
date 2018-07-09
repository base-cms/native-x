import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { getObservable } from 'ember-apollo-client';

import query from 'fortnight/gql/queries/all-stories';
import search from 'fortnight/gql/queries/search-stories';

export default Route.extend(RouteQueryManager, {
  queryParams: {
    phrase: {
      refreshModel: true
    },
    first: {
      refreshModel: true
    },
    after: {
      refreshModel: true
    },
    sortBy: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
  },

  search(phrase, pagination) {
    const controller = this.controllerFor(this.get('routeName'));

    const input = { dispositions: ['Draft', 'Ready'] };
    const variables = { input, pagination, phrase };
    const resultKey = 'searchStories';
    controller.set('resultKey', resultKey);
    return this.get('apollo').watchQuery({ query: search, variables, fetchPolicy: 'network-only' }, resultKey)
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      }).catch(e => this.get('graphErrors').show(e))
    ;
  },

  model({ first, after, sortBy, ascending, phrase }) {
    const controller = this.controllerFor(this.get('routeName'));
    const pagination = { first, after };

    if (phrase) {
      return this.search(phrase, pagination);
    }
    const sort = { field: sortBy, order: ascending ? 1 : -1 };
    const input = { dispositions: ['Draft', 'Ready'] };
    const variables = { pagination, sort, input };
    if (!sortBy) delete variables.sort.field;
    const resultKey = 'allStories';
    controller.set('resultKey', resultKey);
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey)
      .then((result) => {
        controller.set('observable', getObservable(result));
        return result;
      }).catch(e => this.get('graphErrors').show(e))
    ;
  },
});


