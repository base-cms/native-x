import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/report-campaign-summary';

export default Route.extend(RouteQueryManager, {

  model({ hash }) {
    const variables = { input: { hash } };
    return this.apollo.watchQuery({ query, variables });
  },

  setupController() {
    this._super(...arguments);
    this.controllerFor('application').set('hideNav', true);
  },

  renderTemplate: function () {

    this.render();

    this.render('reports.branding', {
        into: 'application',
        outlet: 'branding'
    });
  },

})
