import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate() {
    const controller = this.controllerFor('campaign.edit.creatives.create');
    this.render('campaign.edit.creatives.create.index', {
      controller,
    });
  },
});
