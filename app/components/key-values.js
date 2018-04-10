import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  values: null,
  onChange: null,

  key: '',
  val: '',

  init() {
    this.set('values', this.get('values') || []);
    this._super(...arguments);
  },

  actions: {
    add() {
      const { key, value } = this.getProperties(['key', 'value']);
      this.get('values').pushObject({ key, value });
      this.setProperties({ key: '', value: ''});
      later(this, () => this.$('input.key').last().focus())
      this.sendAction('onChange');
    },
    remove(kv) {
      this.get('values').removeObject(kv);
      this.sendAction('onChange');
    },
    update() {
      this.sendAction('onChange');
    },
  },

});
