import Service, { inject } from '@ember/service';
import { Promise } from 'rsvp';

import imageFocalPoint from 'fortnight/gql/mutations/image/focal-point';

export default Service.extend({
  apollo: inject(),

  /**
   * @param {*} src
   */
  loadFromSource(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', reject);
      img.src = src
    });
  },

  /**
   * Sets an image's focal point on the backend.
   *
   * @param {string} imageId
   * @param {object} focalPoint
   * @param {number} focalPoint.x
   * @param {number} focalPoint.y
   */
  setImageFocalPoint(imageId, { x, y }) {
    const input = { id: imageId, x, y };
    const variables = { input };
    const mutation = imageFocalPoint;
    return this.get('apollo').mutate({ mutation, variables }, 'imageFocalPoint');
  },
});
