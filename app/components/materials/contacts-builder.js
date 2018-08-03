import Component from '@ember/component';

export default Component.extend({
  classNames: ['card', 'border-0', 'z-depth-half'],

  isModalOpen: false,
  selectedContactId: null,

  actions: {
    openModal(contactId) {
      this.set('selectedContactId', contactId);
      this.set('isModalOpen', true);
    },
  },
});
