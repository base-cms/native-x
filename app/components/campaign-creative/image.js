import Component from '@ember/component';
import { computed } from '@ember/object';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

const { round } = Math;

export default Component.extend(ComponentQueryManager, {
  /**
   * @var object image The CampaignCreative.image object
   */
  image: null,

  // eslint-disable-next-line
  defaultFocalpoint: { x: 0.50, y: 0.50 },

  isLoading: false,

  src: computed('image.src', function() {
    const src = this.get('image.src');
    if (!src) return 'https://via.placeholder.com/300x169?text=+';
    return `${src}?w=300`
  }),

  // eslint-disable-next-line
  focalPoint: computed('image', 'image.focalPoint', 'image.focalPoint.{x,y}', function() {
    const dfp = this.get('defaultFocalpoint');
    if (!this.get('image.focalPoint')) return dfp;
    return this.get('image.focalPoint');
  }),

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

      this.set('image.focalPoint', { x, y, xPct, yPct, offset });
    },
    clearFocalPoint() {
      this.set('image.focalPoint', this.get('defaultFocalpoint'));
    },
  },
});
