import Component from '@ember/component';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';

import query from 'fortnight/gql/queries/story/reports/by-day';

export default Component.extend( ObjectQueryManager, {
  isReportRunning: false,

  actions: {
    async runByDayReport({ startDate, endDate }) {
      this.set('isReportRunning', true);
      const variables = {
        input: { id: this.get('storyId') },
        startDate: startDate.valueOf(),
        endDate: endDate.valueOf(),
      };
      try {
        const { reports } = await this.get('apollo').query({ query, variables }, 'story');
        this.set('rows', reports.byDay);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.set('isReportRunning', false);
      }
    },
  },
});
