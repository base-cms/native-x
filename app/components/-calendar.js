import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default Component.extend({
  dateUtil: service(),

  currentDay: null,
  canRemove: false,
  minDate: null,
  maxDate: null,
  displayFormat: 'dddd, MMMM Do, YYYY',

  isRemoveDisabled: computed('canRemove', 'currentDay', function() {
    return this.get('canRemove') && null === this.get('currentDay');
  }),

  center: computed('currentDay', 'minDate', function() {
    const current = this.get('currentDay');
    const minDate = this.get('minDate');
    if (null === current) {
      if (null === minDate) {
        return moment();
      }
      return moment(minDate);
    }
    return moment(current);
  }),

  selected: computed('currentDay', function() {
    return moment(this.get('currentDay'));
  }),

  now: computed(function() {
    return moment();
  }),

  actions: {
    removeDate() {
      this.set('currentDay', null);
      this.sendAction('onSelect', null);
    },
    selectDate(selected) {
      this.set('selected', selected);
      this.sendAction('onSelect', selected);
    },
    centerToday() {
      this.set('center', this.get('dateUtil').convertToDay());
    },
  },
});
