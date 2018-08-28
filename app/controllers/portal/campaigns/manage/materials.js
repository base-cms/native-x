import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { isURL } from 'validator';
import ActionMixin from 'fortnight/mixins/action';

import mutation from 'fortnight/gql/mutations/campaign/url';
import assignCampaignValue from 'fortnight/gql/mutations/campaign/assign-value';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  activeCreatives: computed.filterBy('model.creatives', 'active', true),

  remainingCreatives: computed('model.requiredCreatives', 'activeCreatives.length', function() {
    return this.get('model.requiredCreatives') - this.get('activeCreatives.length');
  }),

  remainingCreativesLabel: computed('remainingCreatives', function() {
    if (this.get('remainingCreatives') > 1) return 'creatives';
    return 'creative';
  }),

  actions: {
    async saveField(field, label, { value }) {
      this.startAction();
      const input = {
        id: this.get('model.id'),
        field,
        value,
      };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: assignCampaignValue, variables }, 'assignCampaignValue');
        this.get('notify').success(`${label || field} saved.`)
      } catch (e) {
        // Handle and throw so the error displays in the field.
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    validateUrl(element) {
      const { value } = element;
      let message = '';
      if (!isURL(value, { protocols: ['http', 'https'], require_protocol: true })) {
        message = 'Please enter a valid URL.';
      }
      element.setCustomValidity(message);
    },

    async updateUrl({ url }) {
      this.startAction();
      const campaignId = this.get('model.id');
      const variables = { input: { campaignId, url } };

      try {
        await this.get('apollo').mutate({ mutation, variables }, 'campaignUrl');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
