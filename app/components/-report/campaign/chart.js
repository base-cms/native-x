import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import moment from 'moment'

export default Component.extend({
  metrics: inject(),

  isLoading: false,

  metricKey: 'ctr',
  metricOptions: computed.reads('metrics.campaign.array').readOnly(),
  selectedMetric: computed('metricKey', function() {
    return this.get(`metrics.campaign.${this.get('metricKey')}`);
  }).readOnly(),

  startDate: computed('endDate', function() {
    return moment(this.get('endDate')).subtract(7, 'days');
  }),
  endDate: computed(function() {
    return moment();
  }),
});
