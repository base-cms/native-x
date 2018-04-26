import Route from '@ember/routing/route';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

import query from 'fortnight/gql/queries/campaign-notifications';

export default Route.extend(RouteQueryManager, {
  model() {
    const { id } = this.modelFor('campaign.edit');
    const resultKey = 'campaign';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  renderTemplate() {
    this.render();
    this.render('campaign.actions.edit.notifications', { outlet: 'actions', into: 'application' });
  },
});
