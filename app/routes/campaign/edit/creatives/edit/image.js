import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate() {
    const controller = this.controllerFor('campaign.edit.creatives.edit');
    this.render('campaign.edit.creatives.edit.image', {
      controller,
    });
  },
});
