import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { computed, get } from '@ember/object';
import { inject } from '@ember/service';

import RemoveMutation from 'fortnight/gql/mutations/remove-campaign-creative';
import UpdateMutation from 'fortnight/gql/mutations/update-campaign-creative';

export default Component.extend(ComponentQueryManager, {

  errorProcessor: inject(),

  campaignId: null,
  creativeId: computed.reads('creative.id'),
  creative: null,
  onRemove: 'onRemove',
  onUpdate: 'onUpdate',

  loading: false,

  id: null,
  name: null,
  title: null,
  url: null,
  teaser: null,
  image: null,

  isModified: computed('id', 'name', 'title', 'url', 'teaser', 'image', 'creative', function() {
    const c = this.get('creative');
    return [ 'id', 'name', 'title', 'url', 'teaser', 'image' ].some(k => this.get(k) !== get(c, k))
  }),

  canSave: computed.reads('isModified'),
  disableSave: computed.not('canSave'),

  init() {
    const { id, name, url, title, teaser, image } = this.get('creative');
    this.setProperties({ id, name, url, title, teaser, image });
    this.set('image', this.get('image') || {});
    this._super(...arguments);
  },

  /**
   * Performs deep comparison of objects
   * @param {*} v
   * @param {*} w
   * @return -1/0/1
   */
  // compareObjects(v, w) {
  //   for (const p in v) {
  //     if (!v.hasOwnProperty(p)) continue;
  //     if (!w.hasOwnProperty(p)) return 1;
  //     if (v[p] === w[p]) continue;
  //     if (typeof(v[p]) !== 'object') return 1;
  //     const c = compare(v[p], w[p]);
  //     if (c) return c;
  //   }
  //   for (const p in w) {
  //     if (w.hasOwnProperty(p) && !v.hasOwnProperty(p)) return -1;
  //   }
  //   return 0;
  // },

  actions: {
    remove() {
      this.set('loading', true);
      const campaignId = this.get('campaignId');
      const creativeId = this.get('creativeId');
      const mutation = RemoveMutation;
      const variables = { input: { campaignId, creativeId } };
      const resultKey = 'removeCampaignCreative';
      // console.warn('campaign-creative.remove()', { mutation, variables }, resultKey);
      return this.apollo.mutate({ mutation, variables }, resultKey)
        // eslint-disable-next-line
        .then(() => this.sendAction(this.get('onRemove'), this.get('creative')))
        .catch(e => this.get('errorProcessor').show(e))
        .then(() => this.set('loading', false))
      ;
    },
    update() {
      if (!this.get('canSave')) return;
      this.set('loading', true);
      const { title, teaser } = this.getProperties(['title', 'teaser']);
      const campaignId = this.get('campaignId');
      const creativeId = this.get('creativeId');
      const mutation = UpdateMutation;
      const payload = { title, teaser };
      const variables = { input: { campaignId, creativeId, payload } };
      const resultKey = 'updateCampaignCreative';
      // console.warn('campaign-creative.save()', { mutation, variables }, resultKey);
      return this.apollo.mutate({ mutation, variables }, resultKey)
        // .then(() => this.sendAction(this.get('onUpdate')))
        .catch(e => this.get('errorProcessor').show(e))
        .then(() => this.set('loading', false))
      ;
    },
  },

});
