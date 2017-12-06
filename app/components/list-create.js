import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  loading: service(),
  user: service(),
  query: service('model-query'),
  error: null,

  advertiser: null,
  advertisers: [],

  modelType: null,
  modelName: null,
  onCreate: null,
  withAdvertiser: false,

  init() {
    if (this.get('withAdvertiser')) {
      this.set('advertisers', this.get('query').execute('advertiser'));
    }
    this._super();
  },

  actions: {
    create() {
      const loading = this.get('loading');
      const name = this.get('modelName');
      const tenant = this.get('user.tid');
      const advertiser = this.get('advertiser');
      const type = this.get('modelType');

      loading.show();
      this.set('error', null);

      if (Ember.isEmpty(name)) {
        this.set('error', 'You must specify a name.');
        return loading.hide();
      }

      if (Ember.isEmpty(advertiser) && this.get('withAdvertiser')) {
        this.set('error', 'You must specify an advertiser.');
        return loading.hide();
      }

      const model = this.get('store').createRecord(type, { name, tenant, advertiser });
      model.save()
        .then(model => this.sendAction('onCreate', type, model))
        .then(() => this.set('modelName', null))
        .catch(e => this.set('error', e))
        .finally(() => loading.hide())
      ;
    },
    setAdvertiser(advertiser) {
      this.set('advertiser', advertiser);
      console.warn('set Advertiser');
    },
  }

});
