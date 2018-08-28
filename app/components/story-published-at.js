import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({

  publishedAt: null,
  displayFormat: 'ddd, MMM Do, YYYY @ h:mma',

  center: computed('publishedAt', function() {
    const current = this.get('publishedAt');
    if (current) return moment(current);
    return moment();
  }),

  selected: computed('publishedAt', function() {
    const current = this.get('publishedAt');
    if (current) return moment(current);
    return moment();
  }),

  now: computed(function() {
    return moment().startOf('day');
  }),

  onSelect(value) {
    const fn = this.get('onSelect');
    if (typeof fn === 'function') {
      fn(value);
    }
  },

  actions: {
    removeDate() {
      this.onSelect(null);
    },
    setPublishedAt(selected) {
      this.onSelect(moment(selected).startOf('day'));
    },
  },
});
