import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

import query from 'fortnight/gql/queries/campaign-creatives';
import mutation from 'fortnight/gql/mutations/add-campaign-creative';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    const { id } = this.modelFor('campaign.edit');
    const resultKey = 'campaign';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  renderTemplate(controller, model) {
    this.render();
    this.render('campaign.actions.edit.creatives', { outlet: 'actions', into: 'application' });
  },

  actions: {
    add() {
      const model = this.modelFor('campaign.edit.creatives');
      const campaignId = model.get('id');
      const variables = { input: { campaignId } };
      const resultKey = 'addCampaignCreative';
      const refetchQueries = ['campaignCreatives'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  }
})
