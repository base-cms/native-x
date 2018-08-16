import Component from '@ember/component';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';
import { computed } from '@ember/object';
import numeral from 'numeral';

import query from 'fortnight/gql/queries/story/reports/devices';

export default Component.extend(ActionMixin, ObjectQueryManager, {

  init() {
    this._super(...arguments);
    this.query();
  },

  series: computed('rows.[]', function() {
    const rows = this.get('rows') || [];
    const data = rows.map((row) => {
      const { deviceCategory, metrics } = row;
      return { name: deviceCategory, y: metrics.users };
    });
    return [{
      name: 'Device Type',
      colorByPoint: true,
      data,
    }];
  }),

  options: computed('series', 'data.length', function() {
    return {
      chart: { type: 'pie' },
      title: { text: false },
      tooltip: {
        formatter: function() {
          return `<span>${this.point.name}</span><br/>
            <strong>${this.y} Users (${numeral(this.percentage).format('0.0')}%)</strong>
          `;
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: { enabled: false },
          showInLegend: true,
        },
      },
    };
  }),

  async query() {
    this.startAction();
    const variables = { input: { id: this.get('storyId') } };
    try {
      const { reports } = await this.get('apollo').query({ query, variables }, 'story');
      this.set('rows', reports.devices);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.endAction();
    }
  },

});
