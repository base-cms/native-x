import Component from '@ember/component';
import ActionMixin from 'fortnight/mixins/action-mixin';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import campaignExternalContact from 'fortnight/gql/mutations/campaign/external-contact';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  campaignId: null,
  contact: null,
  isOpen: false,

  init() {
    this._super(...arguments);
    this.set('contact', {});
  },

  actions: {
    async assign(contact) {
      this.startAction();
      const { email, givenName, familyName } = contact;
      const payload = { email, givenName, familyName };
      const input = {
        campaignId: this.get('campaignId'),
        payload,
      };
      const variables = { input };
      const refetchQueries = ['CampaignHash'];
      try {
        await this.get('apollo').mutate({ mutation: campaignExternalContact, variables, refetchQueries }, 'campaignExternalContact');
        this.get('modal').send('hide');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    setModal(modal) {
      this.set('modal', modal);
    },
  },
});
