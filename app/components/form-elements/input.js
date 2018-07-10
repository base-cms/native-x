import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'input',
  classNameBindings: ['validityClass'],
  attributeBindings: [
    '_value:value',
    'readonly',
    'aria-describedby',
    'autocomplete',
    'autofocus',
    'max',
    'maxlength',
    'min',
    'name',
    'pattern',
    'placeholder',
    'required',
    'step',
    'tabindex',
    'type',
  ],

  /**
   * The default input type.
   */
  type: 'text',

  /**
   * The input value.
   */
  value: '',

  /**
   * The formatted value used by the input.
   * Is passed to the input element.
   * Will converted falsey values to an empty string.
   */
  _value: computed('value', function() {
    const value = this.get('value');
    if (!value) return '';
    return value;
  }),

  /**
   * Whether validation was attempted on the field.
   */
  wasValidated: false,

  /**
   * Whether the field is considered valid.
   * A valid field is one with a falsey `validationMessage`.
   * Otherwise the field is considered invalid.
   */
  isValid: computed('validationMessage', function() {
    const message = this.get('validationMessage');
    if (message) return false;
    return true;
  }),

  /**
   * Computes the validity class based on whether the field has been validated
   * and it's current validity state.
   */
  validityClass: computed('isValid', 'wasValidated', function() {
    if (!this.get('wasValidated')) return false;
    return this.get('isValid') ? 'is-valid' : 'is-invalid';
  }),

  /**
   * The validation message.
   * If set, the field is considered invalid.
   */
  validationMessage: '',

  /**
   * Fires the `on-insert` event with this component instance.
   */
  didInsertElement() {
    this._super(...arguments);
    const fn = this.get('on-insert');
    if (typeof fn === 'function') {
      fn(this);
    }
  },

  /**
   * Validates the input element.
   * Supports custom validation by providing a `validator` function property on this component.
   * If a custom validation function is called, it is up to the
   * function to set the elements validation message via `element.setCustomValidity()`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
   */
  validate() {
    const { element } = this;
    const fn = this.get('validator');
    if (typeof fn === 'function') {
      fn(element);
    }
    element.checkValidity();
    const { validationMessage } = element;
    this.set('validationMessage', validationMessage);
    this.set('wasValidated', true);
  },
});
