import Component from '@ember/component';
import { isArray } from '@ember/array';

export default Component.extend({
  isModalShowing: false,

  isCreating: false,

  init() {
    this._super(...arguments);
    if (!isArray(this.get('kvs'))) {
      this.set('kvs', []);
    } else {
      this.set('kvs', this.get('kvs').slice());
    }
  },

  sendEvent(name) {
    const fn = this.get(name);
    if (typeof fn === 'function') fn(this.get('kvs'));
  },

  actions: {
    handleKeyValue(kv) {
      if (this.get('isCreating')) {
        this.get('kvs').pushObject(kv);
      }
      this.sendEvent('onChange');
    },

    createKeyValue() {
      this.set('isCreating', true);
      this.set('activeKeyValue', { key: '', value: '' });
      this.set('isModalShowing', true);
    },
    editKeyValue(kv) {
      this.set('isCreating', false);
      this.set('activeKeyValue', kv);
      this.set('isModalShowing', true);
    },
    removeKeyValue(kv) {
      this.get('kvs').removeObject(kv);
      this.sendEvent('onChange');
    },
  },

});
