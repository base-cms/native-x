import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import moment from 'moment';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateStory from 'fortnight/gql/mutations/story/update';
import storyImageDimensions from 'fortnight/gql/mutations/story/image-dimensions';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  startMin: moment().startOf('day'),

  actions: {
    async appendImageDimensions(instance, $img, response) {
      const { storyId, imageId } = JSON.parse(response);
      const { naturalWidth, naturalHeight } = $img[0];

      const payload = {
        width: naturalWidth,
        height: naturalHeight,
      };
      const input = { storyId, imageId, payload };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: storyImageDimensions, variables }, 'storyImageDimensions');
      } catch (e) {
        this.get('graphErrors').show(e);
      }
    },

    /**
     *
     * @param {object} fields
     */
    async update({ id, advertiser, title, teaser, body, publishedAt }) {
      this.startAction();
      const payload = {
        title,
        teaser,
        body,
        advertiserId: get(advertiser || {}, 'id'),
        publishedAt: publishedAt ? publishedAt.valueOf() : null,
      };
      const variables = { input: { id, payload } };
      const mutation = updateStory;

      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateStory');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    async delete() {
      this.get('notify').warning('Deleting objects is not yet supported.');
    },
  },
});
