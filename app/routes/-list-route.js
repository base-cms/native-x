import Route from '@ember/routing/route';

const { inject: { service } } = Ember;

export default Route.extend({

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

  query: service('model-query'),

  retrieveModel(modelType, params, criteria = {}) {
    let sort = params.sort;
    if (!params.ascending) {
      sort = `-${sort}`;
    }
    const offset = (params.page - 1) * params.limit;
    if (params.phrase && params.phrase.length) {
      criteria['$text'] = { '$search' : params.phrase };
    }
    return this.get('query').execute(modelType, criteria, params.limit, offset, sort);
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('routeName', this.get('routeName'));
  }
});
