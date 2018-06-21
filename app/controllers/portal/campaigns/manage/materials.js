import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';

export default Controller.extend({
  portalContext: inject(),

  canRemoveCreatives: computed('model.campaign.creatives.length', function() {
    return this.get('model.campaign.creatives.length') > 1;
  }),

  actions: {
    setPortalContext(payload) {
      const context = this.get('portalContext').build(this.get('model'));
      if (Array.isArray(payload.refetchQueries)) {
        payload.refetchQueries.push('CampaignHash');
      } else {
        payload.refetchQueries = ['CampaignHash'];
      }
      payload.context = context;
    },
  },
});
