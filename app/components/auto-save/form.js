import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  // classNameBindings: ['wasValidated:was-validated'],
  novalidate: true,

  shouldAutosave: true,

  submit(event) {
    if (this.get('shouldAutosave')) {
      // When autosave is enabled, prevent the regular form submission.
      // This allows for per-field actions without saving the entire form.
      event.preventDefault();
      event.stopPropagation();
    }
  },
});
