import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  groups: computed('model.creatives.[]', function() {
    // eslint-disable-next-line no-undef
    return _.chunk(this.get('model.creatives'), 3);
  })
});
