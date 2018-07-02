import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/reports/campaign/creative-breakdown';

export default Route.extend(RouteQueryManager, {

  model() {
    const { advertiser, campaign } = this.modelFor('portal.campaigns.manage');
    const hash = campaign.hash;
    const advertiserId = advertiser.id;
    const variables = { input: { hash, advertiserId } };
    this.controllerFor(this.get('routeName')).set('campaign', campaign);
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'reportCampaignCreativeBreakdown');
  }
})

