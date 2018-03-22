import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
  canSave: computed('model.{name,logo}', function() {
    const m = this.get('model');
    return ['name', 'logo'].every(k => !isEmpty(get(m, k)));
  }),
});
