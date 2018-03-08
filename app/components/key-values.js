import Component from '@ember/component';
import { later } from '@ember/runloop';

export default Component.extend({
  values: null,
  actions: {
    add() {
      this.get('values').pushObject({ key: '', value: '' });
      later(this, () => this.$('input.key').last().focus())
    },
    remove(kv) {
      this.get('values').removeObject(kv);
    }
  }

});
