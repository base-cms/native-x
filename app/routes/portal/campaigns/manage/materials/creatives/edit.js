import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import { hash, resolve } from 'rsvp';

import query from 'fortnight/gql/queries/campaign/creative';

export default Route.extend(RouteQueryManager, {

  model({ creative_id }) {
    const { advertiser, campaign } = this.modelFor('portal.campaigns.manage');
    const input = { campaignId: campaign.id, creativeId: creative_id };
    const variables = { input };
    return hash({
      advertiser: resolve(advertiser),
      campaign: resolve(campaign),
      creative: this.get('apollo').watchQuery({ query, variables, refetchPolicy: 'network-only' }, 'campaignCreative'),
    });
  },
});
