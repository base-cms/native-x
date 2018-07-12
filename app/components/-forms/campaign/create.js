import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { get } from '@ember/object';
import { classify } from '@ember/string';
import moment from 'moment';
import ActionMixin from 'fortnight/mixins/action';

import createExternalUrlCampaign from 'fortnight/gql/mutations/campaign/create/external-url';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  tagName: '',
  model: null,
  campaignType: 'external-url',

  createExternalUrlCampaign,

  actions: {
    async create() {
      this.startAction();

      const key = `create${classify(this.get('campaignType'))}Campaign`;

      const startDate = moment().startOf('day').valueOf();
      const { advertiser, name } = this.get('model');
      const input = {
        name,
        startDate,
        advertiserId: get(advertiser, 'id'),
      };

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
