import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate() {
    const controller = this.controllerFor('manage.campaign.edit.creatives.edit');
    this.render('manage.campaign.edit.creatives.edit.image', {
      controller,
    });
  },
});
