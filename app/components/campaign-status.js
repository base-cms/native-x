import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'span',
  classNameBindings: ['color'],

  status: null,

  color: computed('status', function() {
    switch (this.get('status')) {
      case 'Draft':
        return 'text-muted';
      case 'Running':
        return 'text-success';
      case 'Scheduled':
        return 'text-info';
      case 'Incomplete':
        return 'text-warning';
      default:
        return 'text-muted';
    }
  }),
});
