import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  format: 'MMM Do, YYYY',

  label: null,
  date: null,
});
