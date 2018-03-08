import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { inject } from '@ember/service';
import mutation from 'fortnight/gql/mutations/update-campaign';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  errorProcessor: inject(),

  actions: {
    update({ id, url, status, advertiser, name }) {
      const resultKey = 'updateCampaign';
      const advertiserId = advertiser.id;
      const payload = { name, url, status, advertiserId };
      const variables = { input: { id, payload } };
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .then(() => this.refresh())
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  },
})
