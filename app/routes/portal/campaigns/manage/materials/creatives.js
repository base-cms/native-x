import Route from '@ember/routing/route';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

import query from 'fortnight/gql/queries/campaign/creatives';

export default Route.extend(RouteQueryManager, {
  // model() {
  //   const { id } = this.modelFor('manage.campaign.edit');
  //   const variables = { input: { id } };
  //   return this.get('apollo').watchQuery({ query, variables, refetchPolicy: 'network-only' }, 'campaign');
  // },

  actions: {
    setDetailsForm(instance) {
      this.controllerFor(this.get('routeName')).set('detailsForm', instance);
    },
    setModal(instance) {
      this.controllerFor(this.get('routeName')).set('modal', instance);
    },
    hideModal() {
      this.controllerFor(this.get('routeName')).get('modal').send('hide');
    },
  }
});
