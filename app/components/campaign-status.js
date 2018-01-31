import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  tagName: '',

  textClass: computed('value', function() {
    switch (this.get('value')) {
      case 'draft':
        return 'text-warning';
      case 'paused':
        return 'text-muted';
      case 'active':
        return 'text-primary';
    }
    return 'text-danger';
  }),

});
