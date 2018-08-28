import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { set, get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action';

import mutation from 'fortnight/gql/mutations/campaign/add-creative';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  imageLoader: inject(),

  actions: {
    /**
     * Handles the image once uploaded.
     *
     * @param {object} image
     * @param {string} image.id
     * @param {string} image.link
     */
    async handleCreativeImage({ id, link }) {
      set(this.get('model'), 'image', { id, src: link });
    },

    /**
     * Sets the image's focal point.
     *
     * @param {string} imageId
     * @param {object} focalPoint
     * @param {number} focalPoint.x
     * @param {number} focalPoint.y
     */
    async setImageFocalPoint(imageId, { x, y } = {}) {
      this.startAction();
      try {
        await this.get('imageLoader').setImageFocalPoint(imageId, { x, y });
        set(this.get('model'), 'image.focalPoint', { x, y });
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
    async create({ title, teaser, image }) {
      this.startAction();
      const active = true;
      const campaignId = this.get('campaign.id');
      const imageId = get(image, 'id');

      const payload = { title, teaser, active, imageId };
      const variables = { input: { campaignId, payload } };
      const refetchQueries = ['PortalCampaignsManageMaterials'];

      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'addCampaignCreative');
        this.transitionToRoute('portal.campaigns.manage.materials.creatives');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
