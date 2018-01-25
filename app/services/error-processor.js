import Service from '@ember/service';
import Ember from 'ember';
// import { inject } from '@ember/service';
const { inject: { service } } = Ember;

export default Service.extend({
  notify: service(),

  handle(e) {
    console.error(e);
    if (Ember.isPresent(e.errors) && Ember.isPresent(e.errors[0]) && Ember.isPresent(e.errors[0].message)) {
      return new Error(e.errors[0].message);
    }
    if (Ember.isPresent(e.message)) {
      return e;
    }
    return new Error('Some error happen.');
  },

  show(e) {
    const error = this.handle(e);
    this.get('notify').error(error.message);
  }
});
