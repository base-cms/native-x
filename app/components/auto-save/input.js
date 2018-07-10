import Component from '@ember/component';
import { computed } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Component.extend({
  /**
   * Tagless wrapping component.
   */
  tagName: '',

  /**
   * Whether autosave/change events should be fired.
   */
  shouldSendChange: true,

  /**
   * Whether to set the element to readonly
   * while the element is in the mild of a change.
   */
  readOnlyWhileChanging: true,

  /**
   * Whether this element should be considered "two-way" bound.
   * In other words, input/change events will also set the incoming value.
   */
  twoWay: false,

  /**
   * Determines if the field should be readonly.
   * Is passed to the input element.
   * Forces the field into readonly mode while changing, or if
   * passed to the component.
   */
  _readonly: computed('readonly', 'isChanging', 'readOnlyWhileChanging', function() {
    if (this.get('readonly')) return true;
    if (!this.get('readOnlyWhileChanging')) return false;
    return this.get('isChanging');
  }),

  /**
   * Fires the `on-insert` event with this component instance.
   * Allows the parent form component to "see" this wrapping element.
   */
  didInsertElement() {
    this._super(...arguments);
    const fn = this.get('on-insert');
    if (typeof fn === 'function') {
      fn(this);
    }
  },

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
   * Sends the on-change events.
   * Will only fire when the field is valid.
   *
   * @param {string} value
   * @param {Event} event
   */
  async sendOnChange(value, event) {
    this.resetState();
    const fn = this.get('on-change');
    if (typeof fn === 'function' && this.get('_input.isValid')) {
      this.set('isChanging', true);
      try {
        await fn(value, event);
        this.set('changeComplete', true);
      } catch (e) {
        this.set('_input.validationMessage', e.message);
        const onError = this.get('on-error');
        if (typeof onError === 'function') {
          onError(e, value, event);
        }
      } finally {
        this.set('isChanging', false);
      }
    }
  },

  /**
   * Resets the change state of this component.
   */
  resetState() {
    this.set('changeError', null);
    this.set('changeComplete', false);
  },

  /**
   * Validates the wrapped/child input component.
   * Supports custom validation by providing a `validator` function property on this component.
   * If a custom validation function is called, it is up to the
   * function to set the elements validation message via `element.setCustomValidity()`
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
   */
  validate() {
    const child = this.get('_input');
    child.validate();
  },

  actions: {
    /**
     * Sets the wrapped/child, `input` component so it can
     * be accessed in this context.
     *
     * @param {Component} component
     */
    setChildInputComponent(component) {
      this.set('_input', component);
    },

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
      console.info('input', this.get('shouldSendChange'));
      const { target } = event;
      const { value } = target;

      if (this.get('shouldSendChange')) {
        this.resetState(); // Reset when inputting (but not on change)
        const isDirty = this.get('_value') !== value;

        this.validate();

        if (isDirty) {
          debounce(this, 'sendOnChange', value, event, this.get('typeDelay'));
        }
      } else {
        // When autosave events are disabled, re-run validation if previously validated
        if (this.get('twoWay')) this.set('value', value);
        if (this.get('_input.wasValidated')) this.validate();
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
      const { target } = event;
      const { value } = target;
      if (this.get('shouldSendChange')) {
        const isDirty = this.get('_value') !== value;

        this.validate();

        if (isDirty) {
          debounce(this, 'sendOnChange', value, event, 0);
        }
      } else {
        // When autosave events are disabled, re-run validation if previously validated
        if (this.get('twoWay')) this.set('value', value);
        if (this.get('_input.wasValidated')) this.validate();
      }
    },
  },
});
