import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  isLoading: false,
  error: null,
  tenant: {},

  isDisabled: computed('isLoading', 'tenant.hasDirtyAttributes', function() {
    return this.get('isLoading') || !this.get('tenant.hasDirtyAttributes');
  }),

  actions: {
    save() {
      this.set('isLoading', true);
      this.set('error', null);
      this.get('tenant').save()
        .catch(e => this.set('error', e))
        .finally(() => this.set('isLoading', false))
      ;
    }
  }
});
