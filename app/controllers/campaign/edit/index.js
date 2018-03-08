import Controller from '@ember/controller';
export default Controller.extend({
  statii: null,

  init() {
    this.set('statii', ['Active', 'Paused', 'Draft', 'Deleted' ]);
    this._super(...arguments);
  }
});
