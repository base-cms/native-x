import Component from '@ember/component';

export default Component.extend({
  isModalShowing: false,

  link: null,

  init() {
    this._super(...arguments);
    if (!this.get('link')) this.set('link', {});
  },

  actions: {
    submit(hide) {
      this.get('onSubmit')(this.get('link'));
      hide();
    },
  },
});
