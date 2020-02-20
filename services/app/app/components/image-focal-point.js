import Component from '@ember/component';

const { round } = Math;

export default Component.extend({
  tagName: 'img',
  attributeBindings: ['src'],
  classNames: ['img-fluid'],

  src: '', // The original file source.

  click(event) {
    const values = this.calc(event);
    this.get('on-click')(values);
  },

  calc(event) {
    const img = event.target;

    // The difference between the scaled w/h and the client displayed w/h.
    const diffX = round((img.clientWidth - img.width) / 2);
    const diffY = round((img.clientHeight - img.height) / 2);

    // Create new offset by removing these differences.
    const offset = {
      x: event.offsetX - diffX,
      y: event.offsetY - diffY,
    };
    // Ensure the calcs don't go outside the bounds of the actual image.
    ['x', 'y'].forEach((coord) => {
      const dim = 'x' === coord ? 'width' : 'height';
      if (offset[coord] < 0) {
        offset[coord] = 0;
      } else if (offset[coord] > img[dim]) {
        offset[coord] = img[dim];
      }
    });

    const x = round((offset.x / img.width) * 100) / 100;
    const y = round((offset.y / img.height) * 100) / 100;

    return { x, y };
  },
});
