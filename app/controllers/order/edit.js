import Ember from 'ember';

const { Controller, computed, isPresent, inject: { service} } = Ember;

export default Controller.extend({
  dateUtil: service(),

  now: computed(function() {
    return this.get('dateUtil').getToday();
  }),

  startMin: computed.reads('now'),
  startMax: computed('model.end', function() {
    const end = this.get('model.end');
    if (isPresent(end)) {
      return end;
    }
    return this.get('now');
  }),

  endMin: computed('model.start', function() {
    const start = this.get('model.start');
    if (isPresent(start)) {
      return start;
    }
    return this.get('now');
  }),

  endMax: null,

  actions: {
    onCreate(type, model) {
      this.transitionToRoute('line-item.edit', model.get('id'));
    }
  }

});
