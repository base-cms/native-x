import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  advertiserLogo: computed.reads('model.advertiser.logo'),
  publisherLogo: computed('model.criteria.placements.[]', function() {
    const placements = this.get('model.criteria.placements');
    return placements.map(p => p.publisher.logo)[0];
  }),

  impressions: 936,
  clicks: 18,
  ctr: 1.92,

});
