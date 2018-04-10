import Controller from '@ember/controller';
import mutation from 'fortnight/gql/mutations/set-campaign-contacts';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  apollo: inject(),

  isSaving: false,
  hasSaved: false,
  saveMessage: computed('isSaving', 'hasSaved', function() {
    const { isSaving, hasSaved } = this.getProperties(['isSaving', 'hasSaved']);
    if (isSaving) return 'Your changes are being saved.';
    if (hasSaved) return 'Your changes have been saved.';
    return 'Changes made on this tab are saved automatically.';
  }),

  actions: {
    setContacts(type, contacts) {
      this.set('isSaving', true);
      const id = this.get('model.id');
      const contactIds = contacts.map(contact => contact.id);
      const variables = { input: { id, type, contactIds } };
      const resultKey = 'setCampaignContacts';
      const refetchQueries = ['campaignNotifications'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.setProperties({ isSaving: false, hasSaved: true }))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  },

});
