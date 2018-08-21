import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import moment from 'moment'

import query from 'fortnight/gql/queries/campaign/reports/by-day';

export default Controller.extend({
  apollo: inject(),

  metricKey: 'ctr',
  metricOptions: null,
  isReportRunning: false,

  selectedMetric: computed('metricKey', 'metricOptions', function() {
    return this.get('metricOptions').find(opt => opt.key === this.get('metricKey'));
  }),

  startDate: computed('endDate', function() {
    return moment(this.get('endDate')).subtract(7, 'days');
  }),

  endDate: computed(function() {
    return moment();
  }),

  init() {
    this._super(...arguments);
    this.set('metricOptions', [
      { key: 'views', label: 'Impressions', tooltipFormat: '0,0', labelFormat: '0.[0]a' },
      { key: 'clicks', label: 'Clicks', tooltipFormat: '0,0', labelFormat: '0.[0]a' },
      { key: 'ctr', label: 'CTR', tooltipFormat: '0.[000]%', labelFormat: '0.[000]%' },
    ]);
  },

  actions: {
    async runByDayReport({ startDate, endDate }) {
      this.set('isReportRunning', true);
      const variables = {
        input: { hash: this.get('model.campaign.hash'), advertiserId: this.get('model.advertiser.id') },
        startDate: startDate.startOf('day').valueOf(),
        endDate: endDate.startOf('day').valueOf(),
      };
      try {
        const { reports } = await this.get('apollo').query({ query, variables }, 'campaignHash');
        this.set('rows', reports.byDay);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.set('isReportRunning', false);
      }
    },
  },
});
