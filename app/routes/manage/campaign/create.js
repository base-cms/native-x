import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {};
  },

  actions: {
    transitionToEdit(campaign) {
      return this.transitionTo('manage.campaign.edit', campaign.id);
    },
  },
});

