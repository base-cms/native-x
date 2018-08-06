import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  placementEndDate: computed(function() {
    return moment().toDate();
  }),

  placementStartDate: computed('placementEndDate', function() {
    return moment(this.get('placementEndDate')).startOf('month').toDate();
  }),
});
