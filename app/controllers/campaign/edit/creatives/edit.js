import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import campaignCreativeDetails from 'fortnight/gql/mutations/campaign/creative-details';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  imageLoader: inject(),

  actions: {
    /**
     * Handles the image once uploaded.
     * In this case, related the newly uploaded image to the creative.
     *
     * @param {object} image
     * @param {string} image.id
     * @param {string} image.link
     */
    async handleCreativeImage({ id, link }) {
      // set(this.get('model'), 'image', { id, src: link });
    },

    /**
     * Sets the image's focal point.
     *
     * @param {string} imageId
     * @param {object} focalPoint
     * @param {number} focalPoint.x
     * @param {number} focalPoint.y
     */
    async setImageFocalPoint(imageId, { x, y }) {
      this.startAction();
      try {
        await this.get('imageLoader').setImageFocalPoint(imageId, { x, y });
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     * @param {object} fields
     */
    async updateDetails({ title, teaser, status }) {
      this.startAction();

      const creativeId = this.get('model.id');
      const campaignId = this.get('campaignId');
      const payload = { title, teaser, status };

      const mutation = campaignCreativeDetails;
      const input = { creativeId, campaignId, payload }
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'campaignCreativeDetails');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
