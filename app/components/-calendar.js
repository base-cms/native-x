import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import moment from 'moment';

export default Component.extend({
  dateUtil: inject(),

  currentDay: null,
  canRemove: false,
  minDate: null,
  maxDate: null,
  displayFormat: 'dddd, MMMM Do, YYYY h:mm:ss a',
  truncDay: null,

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
      // eslint-disable-next-line
      this.sendAction('onSelect', null);
    },
    selectDate(selected) {
      if (this.get('truncDay') === 'start') {
        selected = moment(selected).startOf('day');
      } else if (this.get('truncDay') === 'end') {
        selected = moment(selected).endOf('day');
      }
      this.set('selected', selected);
      // eslint-disable-next-line
      this.sendAction('onSelect', selected);
    },
    centerToday() {
      this.set('center', this.get('dateUtil').convertToDay());
    },
  },
});
