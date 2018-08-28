import Component from '@ember/component';

const { isArray } = Array;

export default Component.extend({
  init() {
    this._super(...arguments);
    if (!isArray(this.get('aspectRatios'))) {
      // ['21:9', '16:9', '3:2', '4:3', '1:1']
      this.set('aspectRatios', ['1.91:1', '16:9', '4:3', '1:1']);
    }
  }
});
