import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { get } from '@ember/object';
import { classify } from '@ember/string';
import ActionMixin from 'fortnight/mixins/action';

import createExternalUrlCampaign from 'fortnight/gql/mutations/campaign/create/external-url';
import createNewStoryCampaign from 'fortnight/gql/mutations/campaign/create/new-story';
import createExistingStoryCampaign from 'fortnight/gql/mutations/campaign/create/existing-story';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  tagName: '',
  model: null,
  campaignType: 'external-url',

  createExternalUrlCampaign,
  createNewStoryCampaign,
  createExistingStoryCampaign,

  actions: {
    async create() {
      this.startAction();

      const type = this.get('campaignType');

      const key = `create${classify(type)}Campaign`;

      const { advertiser, name, story } = this.get('model');
      const input = { name };
      if (['new-story', 'external-url'].includes(type)) {
        input.advertiserId = get(advertiser, 'id');
      }
      if (type === 'existing-story') {
        input.storyId = get(story, 'id');
      }

      const mutation = this.get(key);
      const variables = { input };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, key);
        await this.sendEventAction('on-success', response);
      } catch (e) {
        this.sendEventAction('on-error', e);
      } finally {
        this.endAction();
      }
    },

    setFieldValue({ name, value }) {
      this.set(`model.${name}`, value);
    },

    setCampaignType({ value }) {
      this.set('campaignType', value);
      this.set('model.story', undefined);
    },
  },
});
