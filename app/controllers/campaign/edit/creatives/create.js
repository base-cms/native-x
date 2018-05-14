import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/add-creative';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    setDetailsForm(instance) {
      this.set('detailsForm', instance);
    },
    setModal(instance) {
      this.set('modal', instance);
    },
    hideModal() {
      this.get('modal').send('hide');
    },

    /**
     *
     * @param {object} fields
     */
    async create({ title, teaser, image }) {
      this.startAction();
      const status = 'Active';
      const campaignId = this.get('campaignId');

      const payload = { title, teaser, status, image };
      const variables = { input: { campaignId, payload } };
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
