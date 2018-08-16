import Component from '@ember/component';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';
import { computed } from '@ember/object';
import moment from 'moment';

import query from 'fortnight/gql/queries/story/reports/by-day';

export default Component.extend(ActionMixin, ObjectQueryManager, {
  tagName: '',

  startDate: computed('endDate', function() {
    return moment(this.get('endDate')).subtract(14, 'days');
  }),

  endDate: computed(function() {
    return moment();
  }),

  data: computed('rows.[]', function() {
    const rows = this.get('rows') || [];
    return rows.map(row => row.metrics.pageviews);
  }),

  series: computed('data.length', function() {
    const data = this.get('data');
    return [{
      name: 'Pageviews',
      data,
    }];
  }),

  options: computed('series', 'data.length', function() {
    const rows = this.get('rows') || [];
    const { length } = this.get('data');
    return {
      chart: { type: 'areaspline' },
      legend: { enabled: false },
      title: { text: false },
      xAxis: {
        categories: rows.map(row => row.shortDate),
        min: 0.5,
        max: length - 1.5,
      },
      yAxis: {
        title: { text: 'Pageviews' },
      },
      plotOptions: {
        areaspline: { fillOpacity: 0.5 },
      },
    };
  }),

  init() {
    this._super(...arguments);
    this.query();
  },

  async query() {
    this.startAction();
    const variables = {
      input: { id: this.get('storyId') },
      startDate: this.get('startDate').valueOf(),
      endDate: this.get('endDate').valueOf(),
    };
    try {
      const { reports } = await this.get('apollo').query({ query, variables }, 'story');
      this.set('rows', reports.byDay);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.endAction();
    }
  },

});
