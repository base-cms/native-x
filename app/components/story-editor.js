import Component from '@ember/component';
import ActionMixin from 'fortnight/mixins/action';
import { inject } from '@ember/service';

import addStoryImage from 'fortnight/gql/mutations/story/add-image';
import imageDimensions from 'fortnight/gql/mutations/image/dimensions';
import removeStoryImage from 'fortnight/gql/mutations/story/remove-image';

export default Component.extend(ActionMixin, {
  apollo: inject(),

  /**
   * The Story ID.
   */
  storyId: null,

  /**
   * The HTML body content.
   */
  value: null,

  actions: {
    /**
     * Adds/relates the image to the story.
     *
     * This fires on the Froala image `loaded` event. While the image is also related
     * to the story when first uploaded and embedded into the body, this action is
     * needed to account for a user undoing an image `remove` to ensure that the relationship
     * is restored on the backend. It's also used during image `replace`.
     *
     * @param {object} instance The Froala editor component instance.
     * @param {obecjt} $img The jQuery element of the loaded image.
     */
    async addImageToStory(instance, $img) {
      const storyId = this.get('storyId');
      const imageId = $img.data('id');
      const variables = { storyId, imageId };
      try {
        await this.get('apollo').mutate({ mutation: addStoryImage, variables }, 'addStoryImage');
      } catch (e) {
        this.get('graphErrors').show(e);
      }
    },

    /**
     * Sends the inserted image's dimensions.
     * This fires on the Froala image `inserted` event. Since the backend is unable
     * calculate the image width/height, the front-end provides it on insert.
     *
     * @param {*} instance The Froala editor component instance.
     * @param {*} $img The jQuery element of the inserted image.
     */
    async sendDimensionsAndSave(instance, $img) {
      // Set the image dimensions.
      const id = $img.data('id');
      const { naturalWidth, naturalHeight } = $img[0];

      const input = {
        id,
        width: naturalWidth,
        height: naturalHeight,
      };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: imageDimensions, variables }, 'imageDimensions');
      } catch (e) {
        this.get('graphErrors').show(e);
      }
    },

    /**
     * Removes/un-relates the image from the story.
     *
     * This fires on the Froala image `removed` event.
     * It's also used during image `replace`.
     *
     * @param {object} instance The Froala editor component instance.
     * @param {obecjt} $img The jQuery element of the removed image.
     */
    async removeImageFromStory(instance, $img) {
      const storyId = this.get('storyId');
      const imageId = $img.data('id');
      const variables = { storyId, imageId };
      try {
        await this.get('apollo').mutate({ mutation: removeStoryImage, variables }, 'removeStoryImage');
        $img.remove();
      } catch (e) {
        this.get('graphErrors').show(e);
      }
    },
  },
});
