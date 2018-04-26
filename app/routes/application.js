import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import ActionMixin from 'fortnight/mixins/action-mixin';

export default Route.extend(ApplicationRouteMixin, ActionMixin, {
  actions: {
    showLoading() {
      this.showLoading();
    },

    hideLoading() {
      this.hideLoading();
    },

    linkTo(name) {
      this.transitionTo(name);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },

    /**
     *
     * @param {*} transition
     */
    loading(transition) {
      this.showLoading();
      transition.finally(() => this.hideLoading());
    },

    /**
     *
     * @param {Error} e
     */
    error(e) {
      if (this.get('graphErrors').isReady()) {
        this.get('graphErrors').show(e);
      } else {
        this.intermediateTransitionTo('application_error', e);
      }
    },

    hardDelete() {
      this.get('notify').warning('Sorry, this item cannot be deleted.');
    },
    softDelete() {
      this.get('notify').warning('Sorry, this item cannot be deleted.');
    },
  }
});
