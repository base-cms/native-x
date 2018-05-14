import Route from '@ember/routing/route';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

import query from 'fortnight/gql/queries/campaign/creative';

export default Route.extend(RouteQueryManager, {
  model({ creative_id }) {
    const campaign = this.modelFor('campaign.edit');
    const input = { campaignId: campaign.id, creativeId: creative_id };
    const variables = { input };
    return this.get('apollo').watchQuery({ query, variables, refetchPolicy: 'network-only' }, 'campaignCreative');
  },

  setupController(controller, model) {
    this._super(controller, model);
    const { id } = this.modelFor('campaign.edit');
    this.controllerFor(this.get('routeName')).set('campaignId', id);
  },
});

