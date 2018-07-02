import Route from '@ember/routing/route';

const prefix = 'portal.campaigns.manage.materials.creatives';

export default Route.extend({
  renderTemplate() {
    const controller = this.controllerFor(`${prefix}.edit`);
    this.render(`${prefix}.edit.preview`, {
      controller,
    });
  },
});
