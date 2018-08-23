import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/portal/campaigns/manage';

export default Route.extend(RouteQueryManager, {
  model({ campaign_hash }) {
    const advertiser = this.modelFor('portal');
    const variables = { input: { hash: campaign_hash, advertiserId: advertiser.id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'campaignHash');
  },
});

