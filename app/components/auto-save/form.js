import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',
  attributeBindings: ['novalidate'],
  novalidate: true,

  shouldAutosave: true,

  submit(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.get('shouldAutosave')) {
      // Only submit the entire form when auto-save is disabled.
      this.get('on-submit')();
    }
  },
});
