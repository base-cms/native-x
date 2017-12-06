import ListRoute from '../-list-route';

export default ListRoute.extend({
  model(params) {
    return this.retrieveModel('order', params);
  },
});
