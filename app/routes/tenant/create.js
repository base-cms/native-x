import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.createRecord('core-account');
  },
  afterModel(model) {
    // console.warn(this.user.model, model.get('users'));
    // model.set('users', [this.user.model]);
  },
  actions: {
    onComplete(tenant) {
      console.warn(val, 'tenant.create onComplete');
      this.transitionTo('tenant.index', tenant.id);
    }
  }
});
