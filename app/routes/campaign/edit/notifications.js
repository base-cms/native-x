import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  actions: {
    update() {
      this.get('notify').info('Changes to contacts are saved automatically.')
    },
  },
});
