import ListRoute from '../-list-route';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default ListRoute.extend({
  // query: service('model-query'),
  user: service(),

  model(params) {
    return Ember.RSVP.hash({
      user: this.store.findRecord('core-user', params.id),
      tenants: this.store.findAll('core-account'),
      selected: this.get('query').execute('core-account-user', { user: params.id })
        .then(rels => rels.map(i => i.get('account')))
    })
  },
});
