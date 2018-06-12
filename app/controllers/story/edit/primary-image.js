import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';
import { computed } from '@ember/object';

import primaryImageStory from 'fortnight/gql/mutations/story/primary-image';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  isUploading: false,
  isFormDisabled: computed.or('isActionRunning', 'isUploading'),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async setPrimaryImage({ id, primaryImage }) {
      this.startAction();
      let payload;
      if (primaryImage) {
        const { filePath, fileSize, focalPoint, height, mimeType, width } = primaryImage;
        const fp = { x: focalPoint.x, y: focalPoint.y };
        payload = { filePath, fileSize, focalPoint: fp, height, mimeType, width };
      } else {
        payload = null;
      }

      const mutation = primaryImageStory;
      const input = { id, payload }
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'primaryImageStory');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
