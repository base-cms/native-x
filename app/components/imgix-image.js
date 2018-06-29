import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'img',
  classNames: [ 'img-fluid' ],
  attributeBindings: [ 'src' ],

  width: 640,
  height: 360,

  src: computed('image.{src,focalPoint.x,focalPoint.y}', 'width', 'height', function() {
    const { src, focalPoint } = this.get('image');
    const { width, height } = this.getProperties(['width', 'height']);
    if (!focalPoint) return `${src}?w=${width}&h=${height}&dpr=1`;

    const { x, y } = focalPoint;
    return `${src}?w=${width}&h=${height}&crop=focalPoint&fit=crop&dpr=1&fp-x=${x}&fp-y=${y}`;
  }),

});
