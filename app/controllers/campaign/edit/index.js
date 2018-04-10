import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { isEmpty } from '@ember/utils';

export default Controller.extend({
  statii: null,
  canChangeStatus: true,

  canSave: computed('model.{name,url,advertiser.id}', function() {
    const m = this.get('model');
    return ['name', 'url', 'advertiser.id'].every(k => !isEmpty(get(m, k)));
  }),

  init() {
    this.set('statii', ['Active', 'Paused', 'Draft', 'Deleted' ]);
    this._super(...arguments);
  },
});
