import Component from '@ember/component';
import { computed } from '@ember/object';
import { isArray } from '@ember/array';

export default Component.extend({
  classNameBindings: ['directionClass'],

  direction: 'up',
  status: null,
  disabled: false,
  buttonClass: 'btn-sm',

  directionClass: computed('direction', function() {
    if (this.get('direction') === 'up') return 'dropup';
    return 'dropdown';
  }),

  filteredStatuses: computed('status', 'statuses.[]', function() {
    return this.get('statuses').filter(status => status !== this.get('status'));
  }),

  buttonColorClass: computed('status', function() {
    const status = this.get('status');
    switch (status) {
      case 'Active':
        return 'btn-success';
      case 'Draft':
        return 'btn-warning';
      default:
        return 'btn-secondary';
    }
  }),

  init() {
    this._super(...arguments);
    if (!isArray(this.get('statuses'))) {
      this.set('statuses', ['Active', 'Draft']);
    }
  },

  actions: {
    setStatus(status) {
      // this.set('status', status);
      const fn = this.get('onChange');
      if (typeof fn === 'function') fn(status);
    },
  },

});
