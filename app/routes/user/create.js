import ListRoute from '../-list-route';
import Ember from 'ember';

export default ListRoute.extend({
  model() {
    Ember.RSVP.hash({
      user: this.store.createRecord('core-user'),
      tenants: this.store.findAll('core-account'),
      selected: [],
    })
  },
});
