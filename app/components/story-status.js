import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  tagName: 'span',
  classNameBindings: ['statusText'],

  status: computed('publishedAt', function() {
    const publishedAt = this.get('publishedAt');
    if (!publishedAt) return 'Draft';
    const date = moment(publishedAt);
    if (date.isAfter(new Date())) return 'Scheduled';
    return 'Published';
  }),

  statusText: computed('status', function() {
    switch (this.get('status')) {
      case 'Draft':
        return 'text-warning';
      case 'Scheduled':
        return 'text-info';
      case 'Published':
        return 'text-success';
      default:
        return 'text-muted';
    }
  }),

});
