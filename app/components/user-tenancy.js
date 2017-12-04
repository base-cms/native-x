import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  store: service(),
  query: service('model-query'),

  model: null,
  options: [],
  selected: [],

  createRel(user, account) {
    const model = this.get('store').createRecord('core-account-user', { account, user });
    model.save();
    this.get('selected').pushObject(account);
  },

  deleteRel(userModel, accountModel) {
    const user = userModel.get('id');
    const account = accountModel.get('id');
    this.get('query').execute('core-account-user', { account, user })
      .then(models => models.map(model => model.destroyRecord()))
    ;
    this.set('selected', this.get('selected').without(accountModel));
  },

  actions: {
    onSelect(selected) {
      const user = this.get('model');

      this.get('options').forEach(account => {
        const accountId = account.get('id');

        if (selected.findBy('id', accountId)) {
          if (!this.get('selected').findBy('id', accountId)) {
            this.createRel(user, account);
          }
        } else {
          if (this.get('selected').findBy('id', accountId)) {
            this.deleteRel(user, account);
          }
        }
      })
    }
  },

});
