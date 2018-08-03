import Component from '@ember/component';

export default Component.extend({
  classNames: ['card', 'border-0', 'z-depth-half'],

  isModalOpen: false,
  selectedContact: null,

  actions: {
    openModal(contact) {
      this.set('selectedContact', contact);
      this.set('isModalOpen', true);
    },

    async removeContact(contactId) {

    },
  },
});
