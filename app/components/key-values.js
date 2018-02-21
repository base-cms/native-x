import Component from '@ember/component';

export default Component.extend({

  values: null,

  key: '',
  val: '',

  actions: {
    add() {
      this.get('values').createFragment({
        key: this.get('key'),
        val: this.get('val'),
      });
      this.set('key', '');
      this.set('val', '');
    },
    remove(kv) {
      this.get('values').removeFragment(kv);
    }
  }

});
