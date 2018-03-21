import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/campaignHash';

export default Route.extend(RouteQueryManager, {

  model({ hash }) {
    const resultKey = 'campaignHash';
    const variables = { input: { hash } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  setupController() {
    this._super(...arguments);
    this.controllerFor('application').set('hideNav', true);
  },
})
