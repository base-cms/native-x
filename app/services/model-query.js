import Ember from 'ember';

const { Service, typeOf, inject: { service }, isArray } = Ember;

export default Service.extend({

  store: service(),
  loading : service(),
  user: service(),
  // errorProcessor: service('error-processor'),

  buildParams(criteria, limit, offset, sort) {
    criteria = ('object' === typeOf(criteria)) ? criteria : {};

    if (0 !== limit) {
      limit = parseInt(limit)  || 25;
    }
    offset = parseInt(offset) || 0;
    sort = sort || "-updatedDate";

    let params = {
      filter: { query : { criteria: JSON.stringify(criteria) } },
      sort: sort
    };
    if (limit > 0) {
      params.page = {
        limit: limit,
        offset: offset,
      };
    }
    return params;
  },

  execute(modelType, criteria, limit, offset, sort, showLoading = true) {
    if (!modelType) {
      throw new Error('No model type specified. Unable to perform query');
    }

    let loading = this.get('loading');
    criteria = criteria || {};

    if (showLoading) {
      loading.show();
    }

    const tenant = this.get('user.tid');
    if (!modelType.includes('core-')) {
      criteria.tenant = tenant;
    }

    let params = this.buildParams(criteria, limit, offset, sort);
    let promise = this.get('store').query(modelType, params);

    promise.then((results) => { return results; });
    // promise.catch(adapterError => this.get('errorProcessor').notify(adapterError.errors));
    promise.finally(() => loading.hide());
    return promise;
  },

  normalizeAndPush(records) {
    // @todo This is a workaround until the `ds-pushpayload-return` featured is brought in.
    // @see https://github.com/emberjs/data/pull/4110
    const store = this.get('store');

    if (isArray(records)) {
      const models = [];
      records.forEach(record => {
        let normalized = store.normalize(record.type, record);
        models.pushObject(store.push(normalized));
      });
      return models;
    }

    if ('object' === typeOf(records)) {
      let normalized = store.normalize(records.type, records);
      return store.push(normalized);
    }
    throw new Error('Invalid records type. Must be an array of records or a single record object.');
  },
});
