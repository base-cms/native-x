import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  tenant: {},

  isLoading: false,
  error: null,

  actions: {
    save() {
      const store = this.get('store');
      this.set('isLoading', true);
      this.set('error', null);

      this.get('tenant').save()
        .then(tenant => {
          const user = this.user.model;
          const rel = store.createRecord('core-account-user', {
            account: tenant,
            user: user,
          });
          return rel.save().then(() => tenant);
        })
        .then(tenant => this.sendAction('onComplete', tenant))
        .catch(error => this.set('error', error))
        .finally(() => this.set('isLoading', false))
      ;
    },
  },
});
