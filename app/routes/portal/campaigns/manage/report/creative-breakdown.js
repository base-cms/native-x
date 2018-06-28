import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/reports/campaign/creative-breakdown';

export default Route.extend(RouteQueryManager, {

  model() {
    const model = this.modelFor('portal.campaigns.manage');
    const { hash } = model.campaign;
    const advertiserId = model.advertiser.id;
    const variables = { input: { hash, advertiserId } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'campaignCreativeBreakdownReport');
  }
})

