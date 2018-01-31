import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  tagName: '',

  textClass: computed('value', function() {
    switch (this.get('value')) {
      case 'Draft':
        return 'text-warning';
      case 'Paused':
        return 'text-muted';
      case 'Active':
        return 'text-primary';
    }
    return 'text-danger';
  }),

});
