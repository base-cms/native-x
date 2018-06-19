import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  actions: {
    hardDelete() {
      this.get('notify').warning('Sorry, this item cannot be deleted.');
    },
    softDelete() {
      this.get('notify').warning('Sorry, this item cannot be deleted.');
    },
  }
});
