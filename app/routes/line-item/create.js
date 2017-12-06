import ListRoute from '../-list-route';

export default ListRoute.extend({
  model() {
    return this.store.createRecord('line-item');
  },
});
