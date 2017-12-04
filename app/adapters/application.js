import Ember            from 'ember';
import JSONAPIAdapter   from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import Inflector from 'ember-inflector';

const { inject: { service } } = Ember;

export default JSONAPIAdapter.extend(DataAdapterMixin, {

  queryService: service('model-query'),

  authorizer: 'authorizer:application',

  coalesceFindRequests: true,

  namespace: 'api/rest',

  pathForType(type) {
    return Inflector.inflector.singularize(Ember.String.dasherize(type));
  },

  findMany(store, type, ids, snapshots) {
    // @todo Once `ds-improved-ajax` is a part of ember-data, this should be re-evaluated.
    const url = this.buildURL(type.modelName, ids, snapshots, 'findMany');
    const params = this.get('queryService').buildParams({
      id : { $in: ids }
    }, ids.length);
    return this.ajax(url, 'GET', { data: params });
  },
});
