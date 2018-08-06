import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  endDate: computed(function() {
    return moment().toDate();
  }),

  startDate: computed('endDate', function() {
    return moment(this.get('endDate')).startOf('month').toDate();
  }),
});
