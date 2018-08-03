import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import storyTitle from 'fortnight/gql/mutations/story/title';
import storyTeaser from 'fortnight/gql/mutations/story/teaser';
import storyBody from 'fortnight/gql/mutations/story/body';
import storyPublisedAt from 'fortnight/gql/mutations/story/published-at';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  classNames: ['card', 'border-0', 'z-depth-half'],

  isPublished: computed('story.publishedAt', function() {
    if (this.get('story.publishedAt')) return true;
    return false;
  }),

  actions: {
    async setTitle({ value }) {
      this.startAction();
      const variables = { id: this.get('story.id'), value };
      try {
        await this.get('apollo').mutate({ mutation: storyTitle, variables }, 'storyTitle');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setTeaser({ value }) {
      this.startAction();
      const variables = {
        id: this.get('story.id'),
        value: value.replace(/[\n\r]/g, ' '),
      };
      try {
        await this.get('apollo').mutate({ mutation: storyTeaser, variables }, 'storyTeaser');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setBody(value) {
      this.startAction();
      const variables = {
        value,
        id: this.get('story.id'),
      };
      try {
        await this.get('apollo').mutate({ mutation: storyBody, variables }, 'storyBody');
        if (!value) {
          await this.send('togglePublished', false);
        }
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    async togglePublished(active) {
      this.startAction();
      const story = this.get('story');
      const value = active ? Date.now() : null;
      const variables = {
        id: story.id,
        value,
      };
      try {
        await this.get('apollo').mutate({ mutation: storyPublisedAt, variables }, 'storyPublisedAt');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
