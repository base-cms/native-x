import Route from '@ember/routing/route';

const prefix = 'portal.campaigns.manage.materials.creatives';

export default Route.extend({
  renderTemplate() {
    const controller = this.controllerFor(`${prefix}.create`);
    this.render(`${prefix}.create.index`, {
      controller,
    });
  },
  actions: {
    willTransition(transition) {
      if (transition.targetName === `${prefix}.create.image`) {
        const controller = this.controllerFor(`${prefix}`);
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
