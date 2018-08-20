import Component from '@ember/component';
import InitValueMixin from 'fortnight/mixins/init-value';
import ActionMixin from 'fortnight/mixins/action';

export default Component.extend(InitValueMixin, ActionMixin, {
  classNames: ['card'],

  startDate: null,
  endDate: null,

  selectedMetric: null,
  metricOptions: null,

  isLoading: false,

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
