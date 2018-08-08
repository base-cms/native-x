import Component from '@ember/component';

export default Component.extend({
  tagName: 'label',
  attributeBindings: ['for'],
  classNames: ['text-muted', 'font-weight-bold'],
});
