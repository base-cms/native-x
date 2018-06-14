import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';
import { computed } from '@ember/object';

import storyPrimaryImage from 'fortnight/gql/mutations/story/primary-image';
import imageFocalPoint from 'fortnight/gql/mutations/image/focal-point';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  isUploading: false,
  isFormDisabled: computed.or('isActionRunning', 'isUploading'),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async setPrimaryImage(storyId, image) {
      this.startAction();
      const mutation = storyPrimaryImage;
      const variables = { storyId };
      if (image && image.id) {
        variables.imageId = image.id;
      }
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'storyPrimaryImage');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    async setImageFocalPoint(imageId, { x, y }) {
      this.startAction();
      const input = { id: imageId, x, y };
      const variables = { input };
      const mutation = imageFocalPoint;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'imageFocalPoint');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
