import Controller from '@ember/controller';
import { inject } from '@ember/service';

import query from 'fortnight/gql/queries/campaign/reports/by-day';

export default Controller.extend({
  apollo: inject(),

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
