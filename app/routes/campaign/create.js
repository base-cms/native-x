import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';
import { getProperties } from '@ember/object';

import mutation from 'fortnight/gql/mutations/create-campaign';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  errorProcessor: inject(),

  model() {
    const { givenName, familyName, email } = getProperties(this.get('user.model'), ['givenName', 'familyName', 'email']);
    const user = {
      name: `${givenName} ${familyName}`,
      value: email,
    };
    return {
      status: 'Draft',
      externalLinks: [],
      notify: {
        internal: [user],
        external: [],
      },
    };
  },
  actions: {
    create({ name, description, advertiser, publisher, url, externalLinks }) {
      const advertiserId = advertiser.id;
      const publisherId = publisher.id;
      const links = externalLinks.map(({ label, url }) => Object.assign({}, { label, url }));
      const payload = { url, name, description, advertiserId, publisherId, externalLinks: links };
      const variables = { input: { payload } };
      const resultKey = 'createCampaign';
      const refetchQueries = ['campaign', 'allCampaigns'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('campaign.edit', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
