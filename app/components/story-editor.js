import Component from '@ember/component';
import ActionMixin from 'fortnight/mixins/action';

import addStoryImage from 'fortnight/gql/mutations/story/add-image';
import imageDimensions from 'fortnight/gql/mutations/image/dimensions';
import removeStoryImage from 'fortnight/gql/mutations/story/remove-image';

export default Component.extend(ActionMixin, {
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
  },
});
