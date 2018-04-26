import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Route.extend(UnauthenticatedRouteMixin, {
  session: inject(),

  beforeModel() {
    // this.showLoading();
    this.get('session').invalidate().finally(() => this.hideLoading());
  }
});
