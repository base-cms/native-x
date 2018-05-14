import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateDetails from 'fortnight/gql/mutations/campaign/update-creative-details';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async updateDetails({ title, teaser, status }) {
      this.startAction();

      const creativeId = this.get('model.id');
      const campaignId = this.get('campaignId');
      const payload = { title, teaser, status };

      const mutation = updateDetails;
      const input = { creativeId, campaignId, payload }
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateCampaignDetails');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
