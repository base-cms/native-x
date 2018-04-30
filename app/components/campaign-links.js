import Component from '@ember/component';
import { isArray } from '@ember/array';

export default Component.extend({
  isModalShowing: false,

  isCreating: false,

  init() {
    this._super(...arguments);
    if (!isArray(this.get('links'))) {
      this.set('links', []);
    }
  },

  sendEvent(name) {
    const fn = this.get(name);
    if (typeof fn === 'function') fn();
  },

  actions: {
    handleLink(link) {
      if (this.get('isCreating')) {
        this.get('links').pushObject(link);
      }
      this.sendEvent('onChange');
    },

    createLink() {
      this.set('isCreating', true);
      this.set('activeLink', { label: '', url: '' });
      this.set('isModalShowing', true);
    },
    editLink(link) {
      this.set('isCreating', false);
      this.set('activeLink', link);
      this.set('isModalShowing', true);
    },
    removeLink(link) {
      this.get('links').removeObject(link);
      this.sendEvent('onChange');
    },
  },

});
