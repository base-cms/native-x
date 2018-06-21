import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { isURL } from 'validator';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/url';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  canRemoveCreatives: computed('model.campaign.creatives.length', function() {
    return this.get('model.campaign.creatives.length') > 1;
  }),

  actions: {
    validateUrl(instance, form) {
      const url = form.elements['campaign-url'];
      if (!url) return;

      const { value } = url;
      if (!value) return;

      const isValid = isURL(value, {
        protocols: ['http', 'https'],
        require_protocol: true,
      })
      url.setCustomValidity(isValid ? '' : 'The provided URL is invalid.');
    },

    async updateUrl({ url }) {
      this.startAction();
      const campaignId = this.get('model.campaign.id');
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
