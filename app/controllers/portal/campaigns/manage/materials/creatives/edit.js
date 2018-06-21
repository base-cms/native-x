import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import campaignCreativeDetails from 'fortnight/gql/mutations/campaign/creative-details';
import campaignCreativeImage from 'fortnight/gql/mutations/campaign/creative-image';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  imageLoader: inject(),
  portalContext: inject(),

  actions: {
    /**
     * Handles the image once uploaded.
     * In this case, relates the newly uploaded image to the creative.
     *
     * @param {object} image
     * @param {string} image.id
     */
    async handleCreativeImage({ advertiser, campaign } = {}, { id }) {
      this.startAction();
      const context = this.get('portalContext').build({ advertiser, campaign });

      const creativeId = this.get('model.creative.id');
      const campaignId = get(campaign || {}, 'id');

      const mutation = campaignCreativeImage;
      const input = { campaignId, creativeId, imageId: id };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation, variables, context }, 'campaignCreativeImage');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Sets the image's focal point.
     *
     * @param {string} imageId
     * @param {object} context
     * @param {object} context.advertiser
     * @param {object} context.campaign
     * @param {object} focalPoint
     * @param {number} focalPoint.x
     * @param {number} focalPoint.y
     */
    async setImageFocalPoint(imageId, { advertiser, campaign } = {}, { x, y }) {
      this.startAction();
      const context = this.get('portalContext').build({ advertiser, campaign });
      try {
        await this.get('imageLoader').setImageFocalPoint(imageId, { x, y }, context);
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
    async updateDetails({ advertiser, campaign } = {}, { id, title, teaser }) {
      this.startAction();

      const campaignId = get(campaign || {}, 'id');
      const payload = { title, teaser };

      const mutation = campaignCreativeDetails;
      const input = { creativeId: id, campaignId, payload }
      const context = this.get('portalContext').build({ advertiser, campaign });
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation, variables, context }, 'campaignCreativeDetails');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
