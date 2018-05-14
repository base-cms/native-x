import Controller from '@ember/controller';
import ActionMixin from 'fortnight/mixins/action-mixin';
import { inject } from '@ember/service';

import removeCreative from 'fortnight/gql/mutations/campaign/remove-creative';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    async remove(creativeId) {
      this.startAction();
      const campaignId = this.get('model.id');

      const mutation = removeCreative;
      const variables = { input: { campaignId, creativeId } };
      const refetchQueries = ['CampaignCreatives'];
      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'removeCampaignCreative');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction();
      }
    },
  },
});
