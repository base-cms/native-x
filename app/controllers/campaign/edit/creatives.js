import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  groups: computed('model.creatives.[]', function() {
    return _.chunk(this.get('model.creatives'), 3);
  })
});
