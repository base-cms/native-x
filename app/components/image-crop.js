import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  originalSrc: null,

  aspectRatio: '16:9',
  fpX: 0.5,
  fpY: 0.5,
  width: 480,

  height: computed('width', 'aspectRatio', function() {
    const v = label.split(this.get('aspectRatio'));
    const value = v[0] / v[1];
    return Math.round(width / value);
  }),
});





