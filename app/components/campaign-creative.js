import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { computed, get } from '@ember/object';
import { inject } from '@ember/service';

import RemoveMutation from 'fortnight/gql/mutations/remove-campaign-creative';
import UpdateMutation from 'fortnight/gql/mutations/update-campaign-creative';

export default Component.extend(ComponentQueryManager, {

  errorProcessor: inject(),

  cid: null,
  creative: null,
  onRemove: 'onRemove',
  onUpdate: 'onUpdate',

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
      const { id } = this.get('creative');
      const cid = this.get('cid');
      const mutation = RemoveMutation;
      const variables = { input: { id, cid } };
      const resultKey = 'removeCampaignCreative';
      // console.warn('campaign-creative.remove()', { mutation, variables }, resultKey);
      return this.apollo.mutate({ mutation, variables }, resultKey)
        // eslint-disable-next-line
        .then(() => this.sendAction(this.get('onRemove'), this.get('creative')))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
    update() {
      if (!this.get('canSave')) return;
      const { id, name, url, title, teaser, image } = this.getProperties();
      const { cid } = this.get('campaign.id');
      const mutation = UpdateMutation;
      const variables = { input: { cid, id, name, url, title, teaser, image } };
      const resultKey = 'updateCampaignCreative';
      // console.warn('campaign-creative.save()', { mutation, variables }, resultKey);
      return this.apollo.mutate({ mutation, variables }, resultKey)
        // .then(() => this.sendAction(this.get('onUpdate')))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  },

});
