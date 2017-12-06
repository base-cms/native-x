import Ember from 'ember';
import moment from 'moment';

const { Component, inject: { service }, computed, isPresent } = Ember;

export default Component.extend({
  store: service(),
  loading: service(),
  user: service(),
  query: service('model-query'),
  dateUtil: service(),
  error: null,

  advertiser: null,
  advertisers: [],

  modelType: null,
  modelName: null,
  onCreate: null,
  withAdvertiser: false,
  withDates: false,

  start: null,
  end: null,

  startMin: computed.reads('start'),
  startMax: computed('end', 'modelEnd', function() {
    const end = this.get('modelEnd');
    if (isPresent(end)) {
      return end;
    }
    return this.get('end');
  }),

  endMin: computed('start', 'modelStart', function() {
    if (isPresent(this.get('modelStart'))) {
      return this.get('modelStart');
    }
    return this.get('start');
  }),

  endMax: computed.reads('end'),

  init() {
    if (this.get('withAdvertiser')) {
      this.set('advertisers', this.get('query').execute('advertiser'));
    }
    if (this.get('withDates')) {
      const start = moment(this.get('start')).isValid() ? this.get('start') : moment();
      const end = moment(this.get('end')).isValid() ? moment(this.get('end')) : null;
      this.set('modelStart', moment(start));
      this.set('modelEnd', end);
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
      const order = this.get('order');
      const start = this.get('modelStart');
      const end = this.get('modelEnd');

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

      if (this.get('withDates') && false === moment(start).isValid()) {
        this.set('error', 'You must specify a valid start date.');
        return loading.hide();
      }

      const model = this.get('store').createRecord(type, { name, tenant, advertiser, order, start, end });
      model.save()
        .then(model => this.sendAction('onCreate', type, model))
        .then(() => this.set('modelName', null))
        .catch(e => this.set('error', e))
        .finally(() => loading.hide())
      ;
    },
  }

});
