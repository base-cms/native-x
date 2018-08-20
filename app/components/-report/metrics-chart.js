import Component from '@ember/component';
import moment from 'moment';
import InitValueMixin from 'fortnight/mixins/init-value';
import ActionMixin from 'fortnight/mixins/action';

export default Component.extend(InitValueMixin, ActionMixin, {
  classNames: ['card'],

  startDate: null,
  endDate: null,

  selectedMetric: null,
  metricOptions: null,

  isLoading: false,

  init() {
    this._super(...arguments);
    this.initDates();
  },

  initDates() {
    const now = moment();
    if (!this.get('endDate')) {
      this.set('endDate', now);
      this.set('startDate', moment(now).subtract(7, 'days'))
    }
  },

  actions: {
    dispatchChange() {
      const {
        startDate,
        endDate,
        selectedMetric,
      } = this.getProperties('startDate', 'endDate', 'selectedMetric');
      console.info('dispatch', { startDate, endDate, selectedMetric });
      this.sendEventAction('onchange', { startDate, endDate, selectedMetric });
    },
  },
});
