import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";
import { inject } from '@ember/service';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {
  notify: inject(),

  actions: {
    update() {
      this.get('notify').info('Changes to contacts are saved automatically.')
    },
  },
});
