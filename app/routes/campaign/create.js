import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/create-campaign';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model() {
    return {
      // status: 'Draft',
      isNew: true,
      externalLinks: [],
    };
  },

  actions: {
    /**
     *
     * @param {object} fields
     */
    async create({ name, description, advertiser, url, externalLinks }) {
      this.startRouteAction();
      const payload = {
        name,
        description,
        advertiserId: get(advertiser || {}, 'id'),
        url,
        externalLinks,
      };
      const variables = { input: { payload } };
      try {
        if (!payload.publisherId) throw new Error('You must select a publisher to continue.');
        const response = await this.apollo.mutate({ mutation, variables }, 'createCampaign');
        this.get('notify').info('Campaign successfully created.');
        return this.transitionTo('campaign.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    },

    /**
     *
     */
    update() {
      // Do nothing. Prevents auto-save on create.
    },

    // create({ name, description, advertiser, url, externalLinks }) {
    //   const advertiserId = advertiser.id;
    //   const links = externalLinks.map(({ label, url }) => Object.assign({}, { label, url }));
    //   const payload = { url, name, description, advertiserId, externalLinks: links };
    //   const variables = { input: { payload } };
    //   const resultKey = 'createCampaign';
    //   const refetchQueries = ['campaign', 'allCampaigns'];
    //   return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
    //     .then(response => this.transitionTo('campaign.edit', response.id))
    //     .catch(e => this.get('errorProcessor').show(e))
    //   ;
    // },
  },
});

