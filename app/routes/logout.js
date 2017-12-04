import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  beforeModel() {
    this.user.logout().then(this.transitionTo('index'))
  }
});
