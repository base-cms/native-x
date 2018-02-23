import Component from '@ember/component';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils'

import moment from 'moment';

import CreateAdvertiser from 'fortnight/gql/mutations/create-advertiser';

export default Component.extend({
  apollo: inject(),
  loading: inject(),
  user: inject(),
  dateUtil: inject(),
  errorProcessor: inject(),

  // advertiser: null,
  advertisers: null,

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

  getGraphQuery(type) {
    switch (type) {
      case 'advertiser':
        return { mutation: CreateAdvertiser, resultKey: 'createAdvertiser' };
    }
    throw new Error(`No GraphQL query defined for "${type}"!`);
  },

  actions: {
    create() {
      const loading = this.get('loading');
      const error = this.get('errorProcessor');

      const name = this.get('modelName');
      const advertiser = this.get('advertiser');
      const type = this.get('modelType');
      const order = this.get('order');
      const lineItem = this.get('lineItem');
      const start = this.get('modelStart');
      const end = this.get('modelEnd');

      loading.show();

      if (isEmpty(name)) {
        error.show(new Error('You must specify a name.'));
        return loading.hide();
      }

      if (isEmpty(advertiser) && this.get('withAdvertiser')) {
        error.show(new Error('You must specify an advertiser.'));
        return loading.hide();
      }

      if (this.get('withDates') && false === moment(start).isValid()) {
        error.show(new Error('You must specify a valid start date.'));
        return loading.hide();
      }

      const { mutation, resultKey } = this.getGraphQuery(type);
      const variables = { input: { name, advertiser, order, start, end, lineItem } };
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        // eslint-disable-next-line
        .then(model => this.sendAction('onCreate', type, model))
        .then(() => this.set('modelName', null))
        .catch(e => error.show(e))
        .finally(() => loading.hide())
      ;
    },
  }

});
