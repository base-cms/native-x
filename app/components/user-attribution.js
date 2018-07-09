import Component from '@ember/component';

export default Component.extend({
  format: 'MMM Do, YYYY @ h:mma',
  label: 'Created',

  date: null,
  user: null,
});
