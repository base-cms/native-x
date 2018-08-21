import Component from '@ember/component';
import { computed, observer } from '@ember/object';

export default Component.extend({

  /**
   * The categories to display
   *
   * @type {array}
   */
  categories: null,

  /**
   * The data to display.
   *
   * @type {array}
   */
  data: null,

  /**
   * The y-axis label/title and series name.
   *
   * @type {string}
   */
  label: 'Metric Label',

  /**
   * Whether the chart is loading.
   *
   * @type {boolean}
   */
  isLoading: false,

  series: computed(function() {
    const data = this.get('data') || [];
    const name = this.get('label');
    return [{
      name,
      data,
    }];
  }),

  options: computed(function() {
    const { length } = this.get('data');
    const tooltipFormatter = this.get('tooltipFormatter');
    return {
      chart: { type: 'areaspline' },
      legend: { enabled: false },
      title: { text: false },
      xAxis: {
        categories: this.get('categories'),
        min: 0.5,
        max: length - 1.5,
      },
      tooltip: {
        // formatter: function() {
        //   const value = format ? numeral(this.y).format(format) : this.y;
        //   const { index, color } = this.point;
        //   const { longDate } = rows[index];
        //   return `<strong>${longDate}</string><br/>
        //     <span style="color:${color}">\u25CF</span> ${this.series.name}: <b>${value}</b>
        //   `;
        // },
      },
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

  config: computed(function() {
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

  updateChart: observer('data.[]', function() {
    const chart = this.get('chart');
    // Update the yAxis label.
    chart.yAxis[0].setTitle({ text: this.get('label') }, false);
    // Set the new xAxis categories and extremes.
    chart.xAxis[0].setCategories(this.get('categories'), false);
    chart.xAxis[0].setExtremes(0.5, this.get('data.length') - 1.5, false);
    // Set the new series data and name.
    chart.series[0].setData(this.get('data'), false);
    chart.series[0].update({ name: this.get('label') }, false);
    chart.redraw(true);
  }),

  didInsertElement() {
    const config = this.get('config');
    const chart = Highcharts.chart(this.$('.chart')[0], config);
    this.set('chart', chart);
  },
});
