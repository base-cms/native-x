import Service from '@ember/service';
import { Promise } from 'rsvp';

export default Service.extend({
  /**
   * @param {*} src
   */
  async loadFromSource(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', reject);
      img.src = src
    });
  },
});
