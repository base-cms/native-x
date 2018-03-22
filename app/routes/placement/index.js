import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/all-placements';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  queryParams: {
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

  totalCount: 0,
  hasNextPage: false,
  endCursor: null,

  setPagination(pagination) {
    const { totalCount } = pagination;
    const { hasNextPage, endCursor } = pagination.pageInfo;
    this.controllerFor('placement.index').setProperties({ totalCount, hasNextPage, endCursor });
    return pagination.edges.map(node => node.node);
  },

  resetController(_controller, isExiting, transition) {
    if (isExiting && transition && transition.targetName !== 'error') {
      this.get('apollo').unsubscribeAll();
    }
  },

  model({ first, after, sortBy, ascending }) {
    const pagination = { first, after };
    const sort = { field: sortBy, order: ascending ? 1 : -1 };
    const variables = { pagination, sort };
    if (!sortBy) delete variables.sort.field;
    const resultKey = 'allPlacements';
    return this.apollo.watchQuery({ query, variables }, resultKey)
      .then(pagination => this.setPagination(pagination))
      .catch(e => this.get('errorProcessor').show(e))
    ;
  },
});
