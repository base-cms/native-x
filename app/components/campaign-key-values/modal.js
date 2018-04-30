import Component from '@ember/component';

export default Component.extend({
  isModalShowing: false,

  kv: null,

  init() {
    this._super(...arguments);
    if (!this.get('kv')) this.set('kv', {});
  },

  actions: {
    submit(hide) {
      this.get('onSubmit')(this.get('kv'));
      hide();
    },
  },
});
