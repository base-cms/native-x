import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

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
    phrase: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
  },

  retrieveRecord(query, resultKey, id) {
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  retrieveModel(query, resultKey, params, /* criteria = {} */) {
    let { limit, sort, page } = params;
    if (!params.ascending) {
      sort = `-${sort}`;
    }
    if (params.phrase && params.phrase.length) {
      // criteria['$text'] = { '$search' : params.phrase };
    }
    const pagination = { size: limit, page, sort };
    const variables = { pagination };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('routeName', this.get('routeName'));
  }
});
