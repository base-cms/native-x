import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateDetails from 'fortnight/gql/mutations/campaign/update-creative-details';
import updateImage from 'fortnight/gql/mutations/campaign/update-creative-image';

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
        await this.get('apollo').mutate({ mutation, variables }, 'updateCampaignCreativeDetails');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    async updateImage({ image }) {
      this.startAction();
      const { filePath, fileSize, focalPoint, height, mimeType, width } = image;
      const fp = { x: focalPoint.x, y: focalPoint.y };
      const payload = { filePath, fileSize, focalPoint: fp, height, mimeType, width };

      const creativeId = this.get('model.id');
      const campaignId = this.get('campaignId');

      const mutation = updateImage;
      const input = { creativeId, campaignId, payload }
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateCampaignCreativeImage');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
