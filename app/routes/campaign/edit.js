import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/campaign';
import mutation from 'fortnight/gql/mutations/update-campaign';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model({ id }) {
    const resultKey = 'campaign';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  actions: {
    hardDelete({ id, name }) {
      const loader = this.get('loader');
      if (window.confirm('Are you sure you want to delete this item?')) {
        const resultKey = 'updateCampaign';
        const payload = { name, status: 'Deleted' };
        const variables = { input: { id, payload } };
        const refetchQueries = ['campaign', 'AllCampaigns'];
        return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
          .then(response => this.transitionTo('campaign.index'))
          .then(() => this.get('notify').warning('Campaign deleted.'))
          .catch(e => this.get('errorProcessor').show(e))
        ;
      }
    },
  }

})
