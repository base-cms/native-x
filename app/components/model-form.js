import Component from '@ember/component';
import { set, get } from '@ember/object';

export default Component.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: true,

  model: null,

  wasValidated: false,
  isValid: false,
  shouldAutosave: false,

  init() {
    this._super(...arguments);
    if (!this.get('model')) this.set('model', {});

    const fn = this.get('onInit');
    if (typeof fn === 'function') fn(this);
  },

  submit(event) {
    const form = this.element;
    event.preventDefault();
    event.stopPropagation();

    const model = this.get('model');

    const isValid = form.checkValidity();
    form.classList.add('was-validated');
    this.set('wasValidated', true);
    this.set('isValid', isValid);
    if (isValid) this.get('onSubmit')(model);
  },

  triggerSubmit() {
    this.$().trigger('submit');
  },

  actions: {
    autosave() {
      if (this.get('shouldAutosave')) {
        this.triggerSubmit();
      }
    },
    setAndAutosave(field, value) {
      const model = this.get('model');
      set(model, field, value);
      this.send('autosave');
    },
    pushAndAutosave(field, value) {
      const model = this.get('model');
      get(model, field).pushObject(value);
      this.send('autosave');
    },
  },

});
