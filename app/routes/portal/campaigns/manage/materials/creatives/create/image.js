import Route from '@ember/routing/route';

const prefix = 'portal.campaigns.manage.materials.creatives';

export default Route.extend({
  beforeModel() {
    const controller = this.controllerFor(prefix);
    const form = controller.get('detailsForm');
    if (!form) {
      // Signifies that the image route is being directly accessed.
      // Redirect to the main create page.
      return this.transitionTo(`${prefix}.create.index`);
    }
  },

  renderTemplate() {
    const controller = this.controllerFor(`${prefix}.create`);
    this.render(`${prefix}.create.image`, {
      controller,
    });
  },
});
