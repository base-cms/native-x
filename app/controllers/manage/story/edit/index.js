import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateStory from 'fortnight/gql/mutations/story/update';
import removeStoryImage from 'fortnight/gql/mutations/story/remove-image';
import addStoryImage from 'fortnight/gql/mutations/story/add-image';
import imageDimensions from 'fortnight/gql/mutations/image/dimensions';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     * Adds/relates the image to the story.
     *
     * This fires on the Froala image `loaded` event. While the image is also related
     * to the story when first uploaded and embedded into the body, this action is
     * needed to account for a user undoing an image `remove` to ensure that the relationship
     * is restored on the backend. It's also used during image `replace`.
     *
     * @param {string} storyId The story ID
     * @param {object} instance The Froala editor component instance.
     * @param {obecjt} $img The jQuery element of the loaded image.
     */
    async addImageToStory(storyId, instance, $img) {
      const imageId = $img.data('id');
      const variables = { storyId, imageId };
      try {
        await this.get('apollo').mutate({ mutation: addStoryImage, variables }, 'addStoryImage');
      } catch (e) {
        this.get('graphErrors').show(e);
      }
    },

    /**
     * Autosaves the story.
     * Will prevent autosave on certain actions where actual body changes
     * do not occur.
     *
     * @param {function} save The autosave action/function to call
     * @param {*} instance The Froala editor component instance.
     * @param {*} cmd The Froala command name.
     */
    autosave(save, instance, cmd) {
      const prevent = [
        'insertLink',
        'linkList',
        'linkOpen',
        'linkEdit',
        'linkBack',
        'insertImage',
        'imageByURL',
        'imageLink',
        'imageBack',
        'imageSize',
        'imageAlt',
        'imageReplace',
        'imageUpload',
        'imageRemove',
        'insertVideo',
        'videoEmbed',
        'videoUpload',
        'videoByURL',
        'emoticons',
        'help',
      ];
      if (!prevent.includes(cmd)) {
        // Save (debounced by 750ms).
        save(750);
      }
    },

    /**
     * Sends the inserted image's dimensions and saves the story.
     * This fires on the Froala image `inserted` event. Since the backend is unable
     * calculate the image width/height, the front-end provides it one-time on insert.
     *
     * @param {function} save The autosave action/function to call
     * @param {*} instance The Froala editor component instance.
     * @param {*} $img The jQuery element of the inserted image.
     */
    async sendDimensionsAndSave(save, instance, $img) {
      // Save the story.
      save();

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
     * Once the removal is complete, the story is saved.
     * It's also used during image `replace`.
     *
     * @param {string} storyId The story ID
     * @param {function} save The autosave action/function to call.
     * @param {object} instance The Froala editor component instance.
     * @param {obecjt} $img The jQuery element of the removed image.
     */
    async removeImageFromStory(storyId, save, instance, $img) {
      const imageId = $img.data('id');
      const variables = { storyId, imageId };
      try {
        await this.get('apollo').mutate({ mutation: removeStoryImage, variables }, 'removeStoryImage');
        $img.remove();
        save();
      } catch (e) {
        this.get('graphErrors').show(e);
      }
    },

    /**
     * Updates the story.
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
     * Deletes the story
     *
     * @todo Implement.
     */
    async delete() {
      this.get('notify').warning('Deleting objects is not yet supported.');
    },
  },
});
