import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import moment from 'moment'

export default Component.extend({
  metrics: inject(),

  isLoading: false,

  metricKey: 'pageviews',
  metricOptions: computed.reads('metrics.story.array').readOnly(),
  selectedMetric: computed('metricKey', function() {
    return this.get(`metrics.story.${this.get('metricKey')}`);
  }).readOnly(),

  startDate: computed('endDate', function() {
    return moment(this.get('endDate')).subtract(14, 'days');
  }),
  endDate: computed(function() {
    return moment();
  }),
});
