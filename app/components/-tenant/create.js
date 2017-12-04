import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tenant: {},

  isLoading: false,
  error: null,

  actions: {
    save() {
      this.set('isLoading', true);
      this.set('error', null);

      this.get('tenant').save()
        .then(tenant => {
          const user = this.user.model;
          user.get('tenants').pushObject(tenant);
          return user.save().then(() => tenant);
        })
        .then(tenant => this.sendAction('onComplete', tenant))
        .catch(error => this.set('error', error))
        .finally(() => this.set('isLoading', false))
      ;
    },
  },
});
