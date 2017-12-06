import ListRoute from '../-list-route';
import { hash } from 'rsvp';

export default ListRoute.extend({
  model(params) {
    return this.retrieveModel('order', params).then((orders) => {
      const waitFor = ['advertiser'];
      const promises = {};
      orders.forEach((m, i) => waitFor.forEach(k => promises[`${k}.${i}`] = m.get(k)));
      return hash(promises).then(() => orders);
    });
  },
});
