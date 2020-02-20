import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'small',

  maxLength: 0,

  length: computed('value.length', function() {
    const length = this.get('value.length');
    return length || 0;
  }),

});
