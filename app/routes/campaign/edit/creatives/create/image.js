import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    const controller = this.controllerFor('campaign.edit.creatives.create');
    const form = controller.get('detailsForm');
    if (!form) {
      // Signifies that the image route is being directly accessed.
      // Redirect to the main create page.
      return this.transitionTo('campaign.edit.creatives.create.index');
    }
  },

  renderTemplate() {
    const controller = this.controllerFor('campaign.edit.creatives.create');
    this.render('campaign.edit.creatives.create.image', {
      controller,
    });
  },
});
