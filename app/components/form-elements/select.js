import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'select',
  attributeBindings: [
    'autocomplete',
    'autofocus',
    'disabled',
    'name',
    'required',
    'aria-describedby',
  ],

  required: false,
  disabled: false,

  /**
   * The selected value.
   */
  selected: '',

  /**
   * The formatted value used by the input.
   * Is passed to the option elements.
   * Will convert falsey values to an empty string.
   */
  _selected: computed('selected', function() {
    const value = this.get('selected');
    if (!value) return '';
    return value;
  }),
});
