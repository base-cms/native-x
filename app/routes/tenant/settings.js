import Route from '@ember/routing/route';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Route.extend({
  query: service('model-query'),

  model(params) {
    return Ember.RSVP.hash({
      tenant: this.store.findRecord('core-account', params.id),
      members: this.get('query').execute('core-account-user', { account: params.id }),
      users: this.store.findAll('core-user'),
    })
  },
})
