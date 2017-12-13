import Ember from 'ember';
import moment from 'moment';

const { Component, inject: { service }, computed, isPresent } = Ember;

export default Component.extend({

  values: [],

  key: '',
  val: '',

  actions: {
    add() {
      console.warn(this.get('values.length'));
      this.get('values').createFragment({
        key: this.get('key'),
        val: this.get('val'),
      });
      console.warn(this.get('values.length'));
      this.set('key', '');
      this.set('val', '');
    },
    remove(kv) {
      this.get('values').removeFragment(kv);
    }
  }

});
