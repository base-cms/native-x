import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNameBindings: ['color'],

  status: null,

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
