import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { hash, resolve } from 'rsvp';

import query from 'fortnight/gql/queries/campaign/hash';

export default Route.extend(RouteQueryManager, {
  model({ campaign_hash }) {
    const advertiser = this.modelFor('portal');
    const variables = { input: { hash: campaign_hash, advertiserId: advertiser.id } };
    return hash({
      advertiser: resolve(advertiser),
      campaign: this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'campaignHash'),
    });
  },
});

