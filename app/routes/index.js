import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject } from '@ember/service';

export default Route.extend(AuthenticatedRouteMixin, {
  session: inject(),

  beforeModel() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('about');
    }
  }
})
