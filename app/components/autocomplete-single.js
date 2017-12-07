import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  modelQuery: service(),

  type: null,
  selected: null,

  search: task(function* (term) {
    yield timeout(600);
    const criteria = { $text: { $search: term } };
    return this.get('modelQuery').execute(this.get('type'), criteria, 25, null, null, false)
  }),
});
