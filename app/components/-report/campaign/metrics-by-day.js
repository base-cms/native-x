import Component from '@ember/component';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';
import { computed } from '@ember/object';
import moment from 'moment';
import numeral from 'numeral';

import query from 'fortnight/gql/queries/campaign/reports/by-day';

export default Component.extend(ActionMixin, ObjectQueryManager, {
  metric: 'views',
  label: 'Impressions',
  format: null,
  labelFormat: null,

  startDate: computed('endDate', function() {
    return moment(this.get('endDate')).subtract(14, 'days');
  }),

  endDate: computed(function() {
    return moment().startOf('day');
  }),

  data: computed('rows.[]', function() {
    const rows = this.get('rows') || [];
    const key = this.get('metric');
    return rows.map(row => row.metrics[key]);
  }),

  series: computed('data.length', function() {
    const data = this.get('data');
    const name = this.get('label');
    return [{
      name,
      data,
    }];
  }),

  options: computed('series', 'data.length', function() {
    const rows = this.get('rows') || [];
    const { length } = this.get('data');
    const format = this.get('format');
    const labelFormat = this.get('labelFormat');
    return {
      chart: { type: 'areaspline' },
      legend: { enabled: false },
      title: { text: false },
      xAxis: {
        categories: rows.map(row => row.shortDate),
        min: 0.5,
        max: length - 1.5,
      },
      tooltip: {
        formatter: function() {

          const value = format ? numeral(this.y).format(format) : this.y;
          const { index, color } = this.point;
          const { longDate } = rows[index];
          return `<strong>${longDate}</string><br/>
            <span style="color:${color}">\u25CF</span> ${this.series.name}: <b>${value}</b>
          `;
        },
      },
      yAxis: {
        title: { text: this.get('label') },
        labels: {
          formatter: function() {
            return labelFormat ? numeral(this.value).format(labelFormat) : this.value;
          },
        },
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
      input: { id: this.get('campaignId') },
      startDate: this.get('startDate').valueOf(),
      endDate: this.get('endDate').valueOf(),
    };
    try {
      const { reports } = await this.get('apollo').query({ query, variables }, 'campaign');
      this.set('rows', reports.byDay);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.endAction();
    }
  },

});
