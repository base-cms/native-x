import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';
import { computed } from '@ember/object';
import numeral from 'numeral';

import query from 'fortnight/gql/queries/story/reports/acquisition';

export default Component.extend(ActionMixin, ComponentQueryManager, {

  init() {
    this._super(...arguments);
    this.query();
  },

  series: computed('rows.[]', function() {
    const rows = this.get('rows') || [];
    const data = rows.map((row) => {
      const { channelGrouping, metrics } = row;
      return { name: channelGrouping, y: metrics.users };
    });
    return [{
      name: 'Channels',
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
      const { reports } = await this.get('apollo').watchQuery({ query, variables }, 'story');
      this.set('rows', reports.acquisition);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.endAction();
    }
  },

});
