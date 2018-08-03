import Component from '@ember/component';
import { computed } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import ActionMixin from 'fortnight/mixins/action-mixin';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import campaignExternalContact from 'fortnight/gql/mutations/campaign/external-contact';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  campaignId: null,
  contact: null,
  isOpen: false,

  isNew: computed('contact.id', function() {
    if (this.get('contact.id')) return false;
    return true;
  }),

  email: oneWay('contact.email'),
  familyName: oneWay('contact.familyName'),
  givenName: oneWay('contact.givenName'),

  model: computed('email', 'familyName', 'givenName', function() {
    return {
      id: this.get('contact.id'),
      email: this.get('email'),
      givenName: this.get('givenName'),
      familyName: this.get('familyName'),
    };
  }),

  init() {
    this._super(...arguments);
    const contact = this.get('contact');
    if (!contact) this.set('contact', {});
  },

  actions: {
    async assign(contact) {
      this.startAction();
      const { id, email, givenName, familyName } = contact;
      const payload = { email, givenName, familyName };
      const input = {
        contactId: id || null,
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
