import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
  canSave: computed('model.{name,publisher}', function() {
    const m = this.get('model');
    return ['name', 'publisher'].every(k => !isEmpty(get(m, k)));
  }),
});
