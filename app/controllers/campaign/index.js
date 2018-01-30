import ListController from '../-list-controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';

export default ListController.extend({
  dateUtil: inject(),

  now: computed(function() {
    return this.get('dateUtil').getToday();
  }),

  startMin: computed.reads('now'),
  startMax: computed('model.end', function() {
    const end = this.get('model.end');
    if (isPresent(end)) {
      return end;
    }
    return this.get('now');
  }),

  endMin: computed('model.start', function() {
    const start = this.get('model.start');
    if (isPresent(start)) {
      return start;
    }
    return this.get('now');
  }),

  endMax: null,
});
