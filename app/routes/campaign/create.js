import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';

import mutation from 'fortnight/gql/mutations/create-campaign';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  errorProcessor: inject(),

  model() {
    return {
      externalLinks: [],
    };
  },
  actions: {
    create({ name, advertiser, url, externalLinks }) {
      const advertiserId = advertiser.id;
      const links = externalLinks.map(({ label, url }) => Object.assign({}, { label, url }));
      const payload = { url, name, advertiserId, externalLinks: links };
      const variables = { input: { payload } };
      const resultKey = 'createCampaign';
      const refetchQueries = ['campaign', 'allCampaigns'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('campaign.edit', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
