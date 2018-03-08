import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import mutation from 'fortnight/gql/mutations/add-campaign-creative';
import { inject } from '@ember/service';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  notify: inject(),

  actions: {
    update() {
      this.get('notify').info('Changes are saved automatically on this screen.')
    },
    add() {
      const model = this.modelFor('campaign.edit');
      const campaignId = model.get('id');
      const variables = { input: { campaignId } };
      const resultKey = 'addCampaignCreative';
      return this.apollo.mutate({ mutation, variables }, resultKey)
        .then(r => model.get('creatives').pushObject(r))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
    onRemove(creative) {
      this.modelFor('campaign.edit').get('creatives').removeObject(creative);
    }
  }
})
