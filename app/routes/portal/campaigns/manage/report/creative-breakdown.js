import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/portal/campaigns/manage/report/creative-breakdown';

export default Route.extend(RouteQueryManager, {
  model() {
    const { hash } = this.modelFor('portal.campaigns.manage');
    const advertiserId = this.modelFor('portal').id;
    const variables = { input: { hash, advertiserId } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'campaignHash');
  },
});
