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

  actions: {
    removeDate() {
      this.set('selected', null);
      // eslint-disable-next-line
      this.sendAction('onSelect', null);
    },
    setPublishedAt(selected) {
      this.set('selected', moment(selected).startOf('day'));
      // eslint-disable-next-line
      this.sendAction('onSelect', selected);
    },
  },
});
