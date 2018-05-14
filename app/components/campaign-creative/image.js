import Component from '@ember/component';
import { computed } from '@ember/object';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

const { round } = Math;

export default Component.extend(ComponentQueryManager, {
  isLoading: false,

  init() {
    this._super(...arguments);
    const dfp = { x: 0.5, y: 0.5 };
    this.set('defaultFocalpoint', dfp);
    if (!this.get('image.focalPoint')) {
      this.set('image.focalPoint', dfp)
    }
  },

  isFocalPointModified: computed('focalPoint.{x,y}', function() {
    const dfp = this.get('defaultFocalpoint');
    const { x, y } = this.get('focalPoint');
    return x !== dfp.x || y !== dfp.y;
  }),

  actions: {
    setFocalPoint({ offset, event }) {
      const img = event.target;

      const x = round((offset.x / img.width) * 100) / 100;
      const y = round((offset.y / img.height) * 100) / 100;
      const xPct = round(x * 100);
      const yPct = round(y * 100);

      const value = { x, y, xPct, yPct, offset }

      this.set('image.focalPoint', value);
      const fn = this.get('onFocalPointChange');
      if (typeof fn === 'function') fn(value);
    },
  },
});
