import Component from '@ember/component';
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  modelQuery: inject(),

  type: null,
  selected: null,
  placeholder: null,

  search: task(function* (term) {
    yield timeout(600);
    const criteria = { $text: { $search: term } };
    return this.get('modelQuery').execute(this.get('type'), criteria, 25, null, null, false)
  }),
});
