import Component from '@ember/component';
import moment from 'moment';
import InitValueMixin from 'fortnight/mixins/init-value';
import ActionMixin from 'fortnight/mixins/action';

export default Component.extend(InitValueMixin, ActionMixin, {
  classNames: ['card'],
  dates: null,

  isLoading: false,

  selectedMetric: null,
  metricOptions: null,

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
    setMetric(metric) {
      this.set('selectedMetric', metric);
      this.sendEventAction('on-metric-change', metric);
    }
  },
});
