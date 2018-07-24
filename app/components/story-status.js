import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  tagName: 'span',
  classNameBindings: ['color'],

  disposition: null,
  publishedAt: null,

  dateFormat: 'MMM Do, YYYY',

  status: computed('disposition', 'publishedAt', function() {
    const disposition = this.get('disposition');
    if (['Draft', 'Placeholder'].includes(disposition)) {
      return disposition;
    }
    const publishedAt = this.get('publishedAt');
    if (!publishedAt) return 'Draft';
    const date = moment(publishedAt);
    if (date.isAfter(new Date())) return 'Scheduled';
    return 'Published';
  }),

  suffix: computed('status', function() {
    const format = this.get('dateFormat');
    const date = this.get('publishedAt');
    switch (this.get('status')) {
      case 'Scheduled':
        return ` for ${moment(date).format(format)}`;
      case 'Published':
      return ` on ${moment(date).format(format)}`;
      default:
        return '';
    }
  }),

  value: computed('status', 'suffix', function() {
    return `${this.get('status')}${this.get('suffix')}`;
  }),

  color: computed('status', function() {
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
