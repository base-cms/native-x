import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';
import moment from 'moment';

import mutation from 'fortnight/gql/mutations/campaign/create';
import autocompleteAdvertisers from 'fortnight/gql/queries/autocomplete-advertisers';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  partialPath: 'manage/campaign/forms/create',
  campaignType: 'external-url',

  formPartial: computed('campaignType', function() {
    return `${this.get('partialPath')}/${this.get('campaignType')}`;
  }),

  init() {
    this._super(...arguments);
    this.set('campaignTypes', [
      { value: 'external-url', label: 'Native Ad with an External URL' },
      { value: 'existing-story', label: 'Native Ad with an Existing Story' },
      { value: 'new-story', label: 'Native Ad with a New Story' },
    ]);
  },

  actions: {
    setType(value) {
      this.set('campaignType', value);
    },

    setFieldValue({ name, value }) {
      this.set(`model.${name}`, value);
    },

    setAdvertiser({ name, value }) {
      // Eventually this could just send a field update of `advertiserId`.
      this.set(`model.${name}`, value);
    },

    async searchAdvertisers(phrase) {
      const pagination = { first: 20 };
      const variables = { pagination, phrase };
      const query = autocompleteAdvertisers;
      try {
        const results = await this.get('apollo').query({ query, variables, fetchPolicy: 'network-only' }, 'autocompleteAdvertisers');
        console.info(results, results.edges.map(edge => edge.node));
        return results.edges.map(edge => edge.node);
      } catch (e) {
        this.get('graphErrors').show(e);
      }
    },

    async testCreate() {
      console.info('testCreate', ...arguments);
      console.info(this.get('model'));
    },

    /**
     *
     * @param {object} fields
     */
    async create({ name, description, advertiser, url, externalLinks }) {
      this.startAction();
      const payload = {
        name,
        description,
        advertiserId: get(advertiser || {}, 'id'),
        url,
        externalLinks,
        startDate: moment().startOf('day').valueOf(),
      };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createCampaign');
        this.get('notify').info('Campaign successfully created.');
        return this.transitionToRoute('manage.campaign.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
