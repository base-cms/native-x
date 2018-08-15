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

  series: computed('rows.[]', function() {
    const rows = this.get('rows') || [];
    return {
      name: 'Pageviews',
      data: rows.map(row => row.metrics.pageviews),
    };
  }),

  options: computed('series', 'rows.[]', function() {
    const rows = this.get('rows') || [];
    return {
      chart: { type: 'areaspline' },
      title: { text: false },
      xAxis: {
        categories: rows.map(row => row.date),
        type: 'datetime',
      },
      yAxis: {
        title: { text: 'Pageviews' },
      },
      tooltip: { valueSuffix: ' pageviews' },
      plotOptions: {
        areaspline: { fillOpacity: 0.5 },
      },
    };

    // const data = this.get('timeSeries');
    // console.info(data);
    // const options = {
    //   title: {
    //     text: false,
    //   },
    //   yAxis: {
    //     title: {
    //       text: false,
    //     }
    //   },
    //   xAxis: {
    //     type: 'datetime',
    //   }
    // }
    // return { data, options };
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
