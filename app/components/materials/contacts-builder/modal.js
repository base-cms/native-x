import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  contactId: null,
  isOpen: false,
  isLoading: false,

  isNew: computed('contactId', function() {
    if (this.get('contactId')) return false;
    return true;
  }),

  didInsertElement() {
    this.loadContact();
  },

  async loadContact() {
    console.info('loadContact');
    if (this.get('isNew')) {
      this.set('contact', {});
      return;
    }
    this.set('isLoading', true);
    this.startAction();
  },

  actions: {
    async create() {
      console.info('create');
    },
  },
});
