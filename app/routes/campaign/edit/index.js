import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import { inject } from '@ember/service';
import mutation from 'fortnight/gql/mutations/update-campaign';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  errorProcessor: inject(),

  actions: {
    update({ id, url, description, status, advertiser, publisher, name, externalLinks }) {
      const resultKey = 'updateCampaign';
      const advertiserId = advertiser.id;
      const publisherId = publisher.id;
      const links = externalLinks.map(({ label, url }) => Object.assign({}, { label, url }));
      const payload = { url, name, description, status, advertiserId, publisherId, externalLinks: links };
      const variables = { input: { id, payload } };
      const refetchQueries = ['campaign', 'allCampaigns'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.refresh())
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  },
})
