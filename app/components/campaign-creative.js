import Component from '@ember/component';
import ActionMixin from 'fortnight/mixins/action-mixin';
import { inject } from '@ember/service';

import removeCreative from 'fortnight/gql/mutations/campaign/remove-creative';
import creativeStatus from 'fortnight/gql/mutations/campaign/creative-status';

export default Component.extend(ActionMixin, {
  classNames: ['card', 'mnh-100'],

  campaignId: null,
  creativeId: null,

  apollo: inject(),

  init() {
    this._super(...arguments);

    // Ensure the action has ended.
    // Fixes issue with calling set on destroyed object after status is updated.
    this.endAction();
  },

  actions: {
    async remove() {
      this.startAction();
      const { campaignId, creativeId } = this.getProperties('campaignId', 'creativeId');

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

    async updateStatus(status) {
      this.startAction();
      const { campaignId, creativeId } = this.getProperties('campaignId', 'creativeId');

      const mutation = creativeStatus;
      const variables = { input: { campaignId, creativeId, status } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'campaignCreativeStatus');
      } catch (e) {
        this.get('graphErrors').show(e);
        this.endAction();
      }
    },
  },
});
