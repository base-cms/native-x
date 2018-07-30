import Component from '@ember/component';

export default Component.extend({
  classNames: ['form-group'],
  value: 'external-url',

  init() {
    this._super(...arguments);
    this.set('types', [
      { value: 'external-url', label: 'Native Ad with an External URL' },
      { value: 'existing-story', label: 'Native Ad with an Existing Story' },
      { value: 'new-story', label: 'Native Ad with a New Story' },
    ]);
  },
});
