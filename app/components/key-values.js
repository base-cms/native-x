import Component from '@ember/component';

export default Component.extend({

  values: null,

  key: '',
  val: '',

  init() {
    this.set('values', this.get('values') || []);
    this._super(...arguments);
  },

  actions: {
    add() {
      this.get('values').pushObject({
        key: this.get('key'),
        val: this.get('val'),
      });
      this.set('key', '');
      this.set('val', '');
    },
    remove(kv) {
      this.get('values').removeObject(kv);
    }
  }

});
