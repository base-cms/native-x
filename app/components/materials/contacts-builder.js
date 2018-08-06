import Component from '@ember/component';
import ActionMixin from 'fortnight/mixins/action-mixin';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import removeCampaignExternalContact from 'fortnight/gql/mutations/campaign/remove-external-contact';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  classNames: ['card', 'border-0', 'z-depth-half'],

  isModalOpen: false,
  selectedContact: null,

  actions: {
    openModal(contact) {
      this.set('selectedContact', contact);
      this.set('isModalOpen', true);
    },

    async removeContact(contactId) {
      this.startAction();
      const input = {
        contactId,
        campaignId: this.get('campaign.id'),
      };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: removeCampaignExternalContact, variables }, 'removeCampaignExternalContact');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
