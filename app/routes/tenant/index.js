import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('core-account', params.id);
  },

  afterModel(resolved) {
    if (resolved && (resolved.get('id') !== this.get('user.oid'))) {
      return this.user.setActiveTenant(resolved.get('id'))
        .then(this.transitionTo('index'));
      ;
    }
  },
});
