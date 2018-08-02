import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { isURL } from 'validator';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/url';
import assignCampaignValue from 'fortnight/gql/mutations/campaign/assign-value';
import storyTitle from 'fortnight/gql/mutations/story/title';
import storyTeaser from 'fortnight/gql/mutations/story/teaser';
import storyBody from 'fortnight/gql/mutations/story/body';
import storyPublisedAt from 'fortnight/gql/mutations/story/published-at';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  canRemoveCreatives: computed('model.campaign.creatives.length', function() {
    return this.get('model.campaign.creatives.length') > 1;
  }),

  isPublished: computed('model.campaign.story.publishedAt', function() {
    if (this.get('model.campaign.story.publishedAt')) return true;
    return false;
  }),

  actions: {
    async saveField(field, label, { value }) {
      this.startAction();
      const input = {
        id: this.get('model.campaign.id'),
        field,
        value,
      };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: assignCampaignValue, variables }, 'assignCampaignValue');
        this.get('notify').success(`${label || field} saved.`)
      } catch (e) {
        // Handle and throw so the error displays in the field.
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setStoryTitle({ value }) {
      this.startAction();
      const variables = { id: this.get('model.campaign.story.id'), value };
      try {
        await this.get('apollo').mutate({ mutation: storyTitle, variables }, 'storyTitle');
      } catch (e) {
        throw this.get('graphErrors').handle(e);
      } finally {
        this.endAction();
      }
    },

    async setStoryTeaser({ value }) {
      this.startAction();
      const variables = {
        id: this.get('model.campaign.story.id'),
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

    async setStoryBody(value) {
      this.startAction();
      const variables = {
        value,
        id: this.get('model.campaign.story.id'),
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
      const story = this.get('model.campaign.story');
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

    validateUrl(element) {
      const { value } = element;
      let message = '';
      if (!isURL(value, { protocols: ['http', 'https'], require_protocol: true })) {
        message = 'Please enter a valid URL.';
      }
      element.setCustomValidity(message);
    },

    async updateUrl({ url }) {
      this.startAction();
      const campaignId = this.get('model.campaign.id');
      const variables = { input: { campaignId, url } };

      try {
        await this.get('apollo').mutate({ mutation, variables }, 'campaignUrl');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
