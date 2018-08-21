import Component from '@ember/component';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';

import reportByDay from 'fortnight/gql/queries/campaign/reports/creative-by-day';
import creativeMetrics from 'fortnight/gql/queries/campaign/creative-metrics';

export default Component.extend(ObjectQueryManager, {
  isReportRunning: false,
  areMetricsLoading: false,

  campaignId: null,
  creativeId: null,

  actions: {
    async runByDayReport({ startDate, endDate }) {
      this.set('isReportRunning', true);
      const variables = {
        input: { campaignId: this.get('campaignId'), creativeId: this.get('creativeId') },
        startDate: startDate.startOf('day').valueOf(),
        endDate: endDate.startOf('day').valueOf(),
      };
      try {
        const { reports } = await this.get('apollo').query({ query: reportByDay, variables }, 'campaignCreative');
        this.set('rows', reports.byDay);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.set('isReportRunning', false);
      }
    },

    async retrieveCreativeMetrics() {
      this.set('areMetricsLoading', true);
      const variables = {
        input: { campaignId: this.get('campaignId'), creativeId: this.get('creativeId') },
      };
      try {
        const { metrics } = await this.get('apollo').query({ query: creativeMetrics, variables }, 'campaignCreative');
        this.set('metrics', metrics);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.set('areMetricsLoading', false);
      }
    },
  },

});
