import Component from '@ember/component';

export default Component.extend({
  tagName: 'h3',
  classNames: ['font-weight-bold', 'text-muted'],

  title: null,
  subtitle: null,
});
