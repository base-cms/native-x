import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import mutation from 'fortnight/gql/mutations/add-campaign-creative';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  actions: {
    update() {
      this.get('notify').info('Changes to creatives are saved using the buttons below.')
    },
    add() {
      const model = this.modelFor('campaign.edit');
      const campaignId = model.get('id');
      const variables = { input: { campaignId } };
      const resultKey = 'addCampaignCreative';
      const refetchQueries = ['campaign'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  }
})
