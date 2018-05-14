import Route from '@ember/routing/route';

export default Route.extend({
  model({ creative_id }) {
    const campaign = this.modelFor('campaign.edit');
    console.info('creativeId', creative_id);
    console.info('campaignId', campaign.id);
    return {};
  },

  setupController(controller, model) {
    this._super(controller, model);
    const { id } = this.modelFor('campaign.edit');
    this.controllerFor(this.get('routeName')).set('campaignId', id);
  },
});

