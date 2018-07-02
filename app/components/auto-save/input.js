import Component from '@ember/component';
import { computed } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Component.extend({
  /**
   * Makes this a "tagless" wrapping component.
   */
  tagName: '',

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
   * Determines if the field should be readonly.
   * Is passed to the input element.
   * Forces the field into readonly mode while changing, or if
   * passed to the component.
   */
  _readonly: computed('readonly', 'isChanging', function() {
    if (this.get('readonly')) return true;
    return this.get('isChanging');
  }),

  /**
   * Builds the class names for the input field.
   * Will append the validity class names.
   */
  _class: computed('class', 'validityClass', function() {
    const names = this.get('class');
    const validity = this.get('validityClass');
    if (!names) return validity;
    if (!validity) return names;
    return `${names} ${validity}`;
  }),

  /**
   * The default input type.
   */
  type: 'text',

  /**
   * Whether autosave/change events should be fired.
   */
  shouldSendChange: true,

  /**
   * Whether the change event is currently being processed.
   */
  isChanging: false,

  /**
   * The number of milliseconds to debounce the
   * change event by when typing.
   */
  typeDelay: 750,

  /**
   * An error that was received when the on change event occured.
   */
  changeError: null,

  /**
   * Whether the change event has completed.
   */
  changeComplete: false,

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
    if (!this.get('wasValidated')) return null;
    return this.get('isValid') ? 'is-valid' : 'is-invalid';
  }),

  /**
   * The validation message.
   * If set, the field is considered invalid.
   */
  validationMessage: '',

  /**
   * Sends the on-change events.
   * Will only fire when the field is valid.
   *
   * @param {string} value
   * @param {Event} event
   */
  async sendOnChange(value, event) {
    this.resetState();
    const fn = this.get('on-change');
    if (typeof fn === 'function' && this.get('isValid')) {
      this.set('isChanging', true);
      try {
        await fn(value, event);
        this.set('changeComplete', true);
      } catch (e) {
        this.set('validationMessage', e.message);
        const onError = this.get('on-error');
        if (typeof onError === 'function') {
          onError(e, value, event);
        }
      } finally {
        this.set('isChanging', false);
      }
    }
  },

  resetState() {
    this.set('changeError', null);
    this.set('changeComplete', false);
  },

  /**
   * Validates the input element.
   * Supports custom validation by providing an `on-validate` function.
   * If a custom validation function is called, it is up to the
   * function to set the elements validation message via `element.setCustomValidity()`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
   * @param {HTMLInputElement} element
   */
  validate(element) {
    const fn = this.get('on-validate');
    if (typeof fn === 'function') {
      fn(element);
    }
    element.checkValidity();
    const { validationMessage } = element;
    this.set('validationMessage', validationMessage);
    this.set('wasValidated', true);
  },

  actions: {
    /**
     * Debounces the input input event.
     * The change event will only fire if the input value is
     * actually dirty. This prevents events from being fired when
     * no-modifying keys are pressed, such as arrows, home/end, etc.
     *
     * When `shouldSendChange` is false, no events are fired.
     *
     * The change event will be debounced based on the
     * milliseconds defined in the `typeDelay` property.
     *
     * @param {Event} event
     */
    debounceInput(event) {
      if (this.get('shouldSendChange')) {
        this.resetState(); // Reset when inputting (but not on change)
        const { target } = event;
        const { value } = target;
        const isDirty = this.get('_value') !== value;

        this.validate(target);

        if (isDirty) {
          debounce(this, 'sendOnChange', value, event, this.get('typeDelay'));
        }
      }
    },

    /**
     * Debounces the input onchange event.
     *
     * When `shouldSendChange` is false, no events are fired.
     *
     * Will immediately fire the change, if dirty, and
     * will cancel any other pending change events.
     *
     * @param {Event} event
     */
    debounceChange(event) {
      if (this.get('shouldSendChange')) {
        const { target } = event;
        const { value } = target;
        const isDirty = this.get('_value') !== value;

        this.validate(target);

        if (isDirty) {
          debounce(this, 'sendOnChange', value, event, 0);
        }
      }
    },
  },
});
