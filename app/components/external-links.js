import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  values: null,
  onChange: null,

  url: '',
  label: '',

  init() {
    this.set('values', this.get('values') || []);
    this._super(...arguments);
  },

  actions: {
    add() {
      const { url, label } = this.getProperties(['url', 'label']);
      this.get('values').pushObject({ url, label });
      this.setProperties({ url: '', label: ''});
      later(this, () => this.$('input.url').last().focus());
      this.get('onChange')();
    },
    remove(kv) {
      this.get('values').removeObject(kv);
      this.get('onChange')();
    },
    update() {
      this.get('onChange')();
    },
  },

});
