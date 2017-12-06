import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Component.extend({
  dateUtil: service(),

  currentDay: null,
  showDaysAround: true,
  minDate: null,
  maxDate: null,

  center: computed('currentDay', function() {
    return moment(this.get('currentDay'));
  }),

  selected: computed('currentDay', function() {
    return moment(this.get('currentDay'));
  }),

  now: computed(function() {
    return moment();
  }),

  actions: {
    selectDate(selected) {
      this.set('selected', selected);
      this.sendAction('onSelect', selected);
    },
    centerToday() {
      this.set('center', this.get('dateUtil').convertToDay());
    },
  },
});
