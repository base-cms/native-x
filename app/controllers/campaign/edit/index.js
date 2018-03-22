import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  statii: null,
  canChangeStatus: true,

  canSave: computed('model.{name,url,advertiser.id,publisher.id}', function() {
    const m = this.get('model');
    return ['name', 'url', 'advertiser.id', 'publisher.id'].every(k => !isEmpty(get(m, k)));
  }),

  init() {
    this.set('statii', ['Active', 'Paused', 'Draft', 'Deleted' ]);
    this._super(...arguments);
  }
});
