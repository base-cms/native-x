import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import cloneStory from 'fortnight/gql/mutations/story/clone';
import updateStory from 'fortnight/gql/mutations/story/update';
import deleteStory from 'fortnight/gql/mutations/story/delete';
import storyPublishedAt from 'fortnight/gql/mutations/story/published-at';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    async setPublishedAt(id, publishedAt) {
      this.startAction();
      const variables = {
        id,
        value: publishedAt ? publishedAt.valueOf() : null,
      }
      const mutation = storyPublishedAt;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'storyPublishedAt');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Updates the story.
     *
     * @param {object} fields
     */
    async update({ id, advertiser, publisher, title, teaser, body, publishedAt }) {
      this.startAction();
      const payload = {
        title,
        teaser,
        body,
        advertiserId: get(advertiser || {}, 'id'),
        publisherId: get(publisher || {}, 'id'),
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
     */
    async delete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deleteStory;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteStory');
        return this.transitionToRoute('manage.story.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Clones the story
     */
    async clone() {
      this.startAction();
      this.set('isCloning', true);
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = cloneStory;
      try {
        const story = await this.get('apollo').mutate({ mutation, variables }, 'cloneStory');
        await this.transitionToRoute('manage.story.edit.index', get(story, 'id'));
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
        this.set('isCloning', false);
      }
    },
  },
});
