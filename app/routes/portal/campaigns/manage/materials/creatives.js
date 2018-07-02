import Route from '@ember/routing/route';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

export default Route.extend(RouteQueryManager, {
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
