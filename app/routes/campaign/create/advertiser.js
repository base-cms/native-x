import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { inject } from '@ember/service';

import query from 'fortnight/gql/queries/advertiser';
import mutation from 'fortnight/gql/mutations/create-campaign';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  errorProcessor: inject(),

  model({ id }) {
    const variables = { input: { id } }
    const resultKey = 'advertiser';
    return this.apollo.watchQuery({ query, variables }, resultKey)
      .then(({ id, name }) => {
        return { name: '', advertiser: { id, name }}
      })
    ;
  },
  actions: {
    create({ name, advertiser, url }) {
      const advertiserId = advertiser.id;
      const variables = { input: { payload: { name, advertiserId, url } } };
      const resultKey = 'createCampaign';
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .then(response => this.transitionTo('campaign.edit', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
