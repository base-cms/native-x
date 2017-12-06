import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Ember from 'ember';

const { inject: { service } } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  session: service(),

  beforeModel() {
    if (!this.get('session.isAuthenticated')) {
      this.transitionTo('about');
    }
  }
})
