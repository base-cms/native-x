import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const { advertiser, campaign } = this.modelFor('portal.campaigns.manage');
    return {
      advertiser,
      campaign,
      creative: {},
    };
  },
});
