import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {};
  },

  setupController(controller, model) {
    this._super(controller, model);
    const { id } = this.modelFor('campaign.edit');
    this.controllerFor(this.get('routeName')).set('campaignId', id);
  },
});

