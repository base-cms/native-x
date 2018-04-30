import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/add-creative';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  groups: computed('model.creatives.[]', function() {
    // eslint-disable-next-line no-undef
    return _.chunk(this.get('model.creatives'), 3);
  }),

  actions: {
    async add() {
      this.startAction();
      const model = this.get('model');

      const campaignId = model.get('id');
      const variables = { input: { campaignId } };
      const refetchQueries = ['CampaignCreatives'];
      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'addCampaignCreative');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
