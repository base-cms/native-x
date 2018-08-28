import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {};
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('campaign', this.modelFor('portal.campaigns.manage'))
  },
});
