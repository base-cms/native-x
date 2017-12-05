import ListRoute from '../-list-route';
import Ember from 'ember';

export default ListRoute.extend({
  model() {
    return this.store.createRecord('core-user');
  },
});
