import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  classNames: ['container'],
  store: service(),

  tenant: null,
  members: [],
  options: [],

  users: computed('options.[]', 'members.[]', function() {
    const options = this.get('options');
    const members = this.get('members');
    return options.filter(user => {
      const uid = user.get('id');
      if (!members.findBy('user.id', uid)) {
        return user;
      }
    })
  }),

  isLoading: true,
  error: null,

  actions: {
    create(user) {
      this.set('isLoading', true);
      const account = this.get('tenant');
      const model = this.get('store').createRecord('core-account-user', { account, user });
      model.save()
        .then(() => this.get('members').pushObject(model))
        .finally(() => this.set('isLoading', false))
      ;
    },
    delete(rel) {
      if (confirm(`Are you sure you want to remove ${rel.get('user.givenName')} ${rel.get('user.familyName')}?`)) {
        this.set('isLoading', true);
        this.set('members', this.get('members').without(rel));
        rel.destroyRecord()
          .finally(() => this.set('isLoading', false))
      }
    },
  },
});
