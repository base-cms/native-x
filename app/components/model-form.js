import Component from '@ember/component';
import { set } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Component.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: true,

  model: null,

  wasValidated: false,
  shouldAutosave: false,
  autosaveDelay: 750,

  submit(event) {
    const form = this.element;
    event.preventDefault();
    event.stopPropagation();

    const model = this.get('model');

    const isValid = form.checkValidity();
    form.classList.add('was-validated');
    this.set('wasValidated', true);
    if (isValid) this.get('onSubmit')(model);
  },

  actions: {
    autosave() {
      if (this.get('shouldAutosave')) {
        debounce(this, () => this.trigger('submit'), 750);
      }
    },
    setAndAutosave(field, value) {
      const model = this.get('model');
      set(model, field, value);
      this.send('autosave');
    },
  },

});
