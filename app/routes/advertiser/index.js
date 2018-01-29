import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { inject } from '@ember/service';

import query from 'fortnight/gql/queries/all-advertisers';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  queryParams: {
    limit: {
      refreshModel: true
    },
    ascending: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    },
    // phrase: {
    //   refreshModel: true
    // },
    page: {
      refreshModel: true
    },
  },

  model(params) {
    let { limit, sort, page } = params;
    if (!params.ascending) {
      sort = `-${sort}`;
    }
    // if (params.phrase && params.phrase.length) {
    //   criteria['$text'] = { '$search' : params.phrase };
    // }
    const pagination = { size: limit, page, sort };
    const variables = { pagination };
    const resultKey = 'allAdvertisers';
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },
});
