import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  contact: null,
  isOpen: false,

  isNew: computed('contact.id', function() {
    if (this.get('contact.id')) return false;
    return true;
  }),

  init() {
    this._super(...arguments);
    const contact = this.get('contact');
    if (!contact) {
      this.set('contact', {});
    } else {
      // Clone the contact so it's one-way.
      this.set('contact', { ...contact });
    }
  },

  actions: {
    async create() {
      console.info('create');
    },
  },
});
