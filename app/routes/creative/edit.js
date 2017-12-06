import ListRoute from '../-list-route';

export default ListRoute.extend({
  model(params) {
    return this.store.findRecord('creative', params.id);
  },
});
