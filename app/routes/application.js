import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Route.extend(ApplicationRouteMixin, {
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
