import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  format: 'MMM Do, YYYY',

  date: null,

  isInPast: computed('date', function() {
    const date = this.get('date');
    if (!date) return false;
    return moment(date).isBefore(new Date());
  }).readOnly(),

  label: computed('isInPast', function() {
    if (this.get('isInPast')) return 'Published';
    return 'Will publish'
  }).readOnly(),
});
