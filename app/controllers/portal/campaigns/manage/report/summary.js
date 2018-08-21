import Controller from '@ember/controller';
import { inject } from '@ember/service';

import reportByDay from 'fortnight/gql/queries/campaign/reports/by-day';
import campaignMetrics from 'fortnight/gql/queries/campaign/metrics';

export default Controller.extend({
  apollo: inject(),

  isReportRunning: false,
  areMetricsLoading: false,

  actions: {
    async runByDayReport({ startDate, endDate }) {
      this.set('isReportRunning', true);
      const variables = {
        input: { hash: this.get('model.campaign.hash'), advertiserId: this.get('model.advertiser.id') },
        startDate: startDate.startOf('day').valueOf(),
        endDate: endDate.startOf('day').valueOf(),
      };
      try {
        const { reports } = await this.get('apollo').query({ query: reportByDay, variables }, 'campaignHash');
        this.set('rows', reports.byDay);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.set('isReportRunning', false);
      }
    },

    async retrieveCampaignMetrics() {
      this.set('areMetricsLoading', true);
      const variables = {
        input: { hash: this.get('model.campaign.hash'), advertiserId: this.get('model.advertiser.id') },
      };
      try {
        const { metrics } = await this.get('apollo').query({ query: campaignMetrics, variables }, 'campaignHash');
        this.set('metrics', metrics);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.set('areMetricsLoading', false);
      }
    },
  },
});
