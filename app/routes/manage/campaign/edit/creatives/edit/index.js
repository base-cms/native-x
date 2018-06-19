import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate() {
    const controller = this.controllerFor('manage.campaign.edit.creatives.edit');
    this.render('manage.campaign.edit.creatives.edit.index', {
      controller,
    });
  },
  actions: {
    willTransition(transition) {
      if (transition.targetName === 'manage.campaign.edit.creatives.edit.image') {
        const controller = this.controllerFor('manage.campaign.edit.creatives');
        const form = controller.get('detailsForm');
        form.triggerSubmit();
        if (!form.get('isValid')) {
          transition.abort();
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
  },
});
