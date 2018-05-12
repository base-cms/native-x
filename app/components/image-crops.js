import Component from '@ember/component';
import { computed } from '@ember/object';

const { isArray } = Array;

export default Component.extend({
  fpX: 0.5,
  fpY: 0.5,

  originalSrc: null,
  width: 480,

  crops: computed('orginalSrc', 'fpX', 'fpY', 'width', function() {

    const dpr = window.devicePixelRatio;
    const { width, fpX, fpY } = this.getProperties('width', 'fpX', 'fpY');

    return this.get('aspectRatios').map((label) => {
      const v = label.split(':');
      const value = v[0] / v[1];

      const height = Math.round(width / value);
      const src = `${this.get('originalSrc')}?w=${width}&h=${height}&crop=focalpoint&fit=crop&dpr=${dpr}&fp-x=${fpX}&fp-y=${fpY}`;
      return { label, value, src };
    });
  }),

  init() {
    this._super(...arguments);
    if (!isArray(this.get('aspectRatios'))) {
      // ['21:9', '16:9', '3:2', '4:3', '1:1']
      this.set('aspectRatios', ['16:9', '4:3', '1:1']);
    }
  }
});





