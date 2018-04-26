import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
  apollo: inject(),
  errorProcessor: inject(),

  actions: {
    linkTo(name) {
      this.transitionTo(name);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    hardDelete() {
      this.get('notify').warning('Sorry, this item cannot be deleted.');
    },
    softDelete() {
      this.get('notify').warning('Sorry, this item cannot be deleted.');
    },
  }
});
