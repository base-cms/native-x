import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
  brandingLogo: computed('model.criteria.placements.[]', function() {
    const placements = this.get('model.criteria.placements');
    return placements.map(p => p.publisher.logo)[0];
  }),
});
