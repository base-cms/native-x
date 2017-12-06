import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  modelQuery: service(),

  selected: null,

  search: task(function* (term) {
    yield timeout(600);
    const criteria = { $text: { $search: term } };
    return this.get('modelQuery').execute('advertiser', criteria, 25, null, null, false)
  }),
});
