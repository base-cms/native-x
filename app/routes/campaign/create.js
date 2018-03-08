import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';

import mutation from 'fortnight/gql/mutations/create-campaign';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  errorProcessor: inject(),

  model() {
    return {};
  },
  actions: {
    create({ name, advertiser, url }) {
      const advertiserId = advertiser.id;
      const payload = { url, name, advertiserId };
      const variables = { input: { payload } };
      const resultKey = 'createCampaign';
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .then(response => this.transitionTo('campaign.edit', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
