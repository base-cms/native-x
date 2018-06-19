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

    transitionTo(name) {
      return this.transitionTo(name);
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
  }
});
