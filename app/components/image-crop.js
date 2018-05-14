import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  originalSrc: null,
  imgClass: null,

  aspectRatio: '16:9',
  fpX: 0.5,
  fpY: 0.5,
  width: 480,
  alt: null,
  title: null,

  height: computed('width', 'aspectRatio', function() {
    const v = this.get('aspectRatio').split(':');
    const value = v[0] / v[1];
    return Math.round(this.get('width') / value);
  }),
});





