import Service from '@ember/service';
import Ember from 'ember';

const target = '#loading-trigger';

export default Service.extend({
  show() {
    Ember.$(target).show();
  },
  hide() {
    window.setTimeout(() => Ember.$(target).hide(), 250);
  },
});
