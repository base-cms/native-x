import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { set, get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/add-creative';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  imageLoader: inject(),

  actions: {
    /**
     * Handles the image once uploaded.
     * In this case, sets it to the `creative` model.
     *
     * @param {object} image
     * @param {string} image.id
     * @param {string} image.link
     */
    async handleCreativeImage(context, { id, link }) {
      set(this.get('model'), 'image', { id, src: link });
    },

    /**
     * Sets the image's focal point.
     *
     * @param {string} imageId
     * @param {object} context
     * @param {object} focalPoint
     * @param {number} focalPoint.x
     * @param {number} focalPoint.y
     */
    async setImageFocalPoint(imageId, context, { x, y }) {
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
      const status = 'Active';
      const campaignId = this.get('campaignId');
      const imageId = get(image, 'id');

      const payload = { title, teaser, status, imageId };
      const variables = { input: { campaignId, payload } };
      const refetchQueries = ['CampaignCreatives'];
      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'addCampaignCreative');
        this.transitionToRoute('manage.campaign.edit.creatives');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
