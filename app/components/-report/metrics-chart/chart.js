import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import InitValueMixin from 'fortnight/mixins/init-value';

export default Component.extend(InitValueMixin, {

  /**
   * The categories to display
   */
  categories: null,

  /**
   * The data to display
   */
  data: null,

  label: 'Metric Label',

  isLoading: false,

  series: computed('data.length', 'label', function() {
    const data = this.get('data');
    const name = this.get('label');
    return [{
      name,
      data,
    }];
  }),

  options: computed('series', 'data.length', function() {
    const { length } = this.get('data');
    return {
      chart: { type: 'areaspline' },
      legend: { enabled: false },
      title: { text: false },
      xAxis: {
        categories: this.get('categories'),
        min: 0.5,
        max: length - 1.5,
      },
      // tooltip: {
      //   formatter: function() {
      //     const value = format ? numeral(this.y).format(format) : this.y;
      //     const { index, color } = this.point;
      //     const { longDate } = rows[index];
      //     return `<strong>${longDate}</string><br/>
      //       <span style="color:${color}">\u25CF</span> ${this.series.name}: <b>${value}</b>
      //     `;
      //   },
      // },
      yAxis: {
        title: { text: this.get('label') },
        // labels: {
        //   formatter: function() {
        //     return labelFormat ? numeral(this.value).format(labelFormat) : this.value;
        //   },
        // },
      },
      plotOptions: {
        areaspline: { fillOpacity: 0.5 },
      },
    };
  }),

  config: computed('options', 'series', function() {
    const config = this.get('options') || {};
    config.series = this.get('series') || [];
    return config;
  }),

  showLoading: observer('isLoading', function() {
    const chart = this.get('chart');
    if (this.get('isLoading')) {
      chart.showLoading();
    } else {
      chart.hideLoading();
    }
  }),

  init() {
    this._super(...arguments);
    this.initValue('data', []);
    this.initValue('categories', []);
  },

  didInsertElement() {
    const config = this.get('config');
    const chart = Highcharts.chart(this.$('.chart')[0], config);
    this.set('chart', chart);
  },
});
