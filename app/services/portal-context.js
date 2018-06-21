import Service from '@ember/service';
import { get } from '@ember/object';

export default Service.extend({
  /**
   * Builds the request context for graph queries originating from the
   * advertiser portal.
   *
   * @param {object} params
   * @param {?object} advertiser The advertiser model
   * @param {?object} campaign The campaign model
   */
  build({ advertiser, campaign }) {
    return {
      advertiserHash: get(advertiser, 'hash'),
      campaignHash: get(campaign, 'hash'),
    };
  },
});
