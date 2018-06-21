import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { set, get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/add-creative';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  imageLoader: inject(),
  portalContext: inject(),

  actions: {
    /**
     * Handles the image once uploaded.
     * In this case, sets it to the `creative` model.
     *
     * @param {object} image
     * @param {string} image.id
     * @param {string} image.link
     */
    async handleCreativeImage({ id, link }) {
      set(this.get('model'), 'creative.image', { id, src: link });
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
    async setImageFocalPoint(imageId, { advertiser, campaign } = {}, { x, y } = {}) {
      this.startAction();
      const context = this.get('portalContext').build({ advertiser, campaign });
      try {
        await this.get('imageLoader').setImageFocalPoint(imageId, { x, y }, context);
        set(this.get('model.creative'), 'image.focalPoint', { x, y });
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
    async create({ advertiser, campaign } = {}, { title, teaser, image }) {
      this.startAction();
      const status = 'Active';
      const campaignId = get(campaign, 'id');
      const imageId = get(image, 'id');

      const payload = { title, teaser, status, imageId };
      const variables = { input: { campaignId, payload } };
      const refetchQueries = ['CampaignHash'];

      const context = this.get('portalContext').build({ advertiser, campaign });
      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries, context }, 'addCampaignCreative');
        this.transitionToRoute('portal.campaigns.manage.materials.creatives');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
