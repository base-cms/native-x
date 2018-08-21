import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import numeral from 'numeral';

export default Component.extend({
  /**
   * An array of day objects, with short and long date strings.
   * The `shortDate` value will be used as the x-axis categories and
   * the `longDate` value will be used for the point tooltip.
   *
   * For example:
   * `[{ shortDate: 'Jan 1, 2018', longDate: 'Wednesday, Janaury 1st, 2018 }]`
   */
  days: null,

  /**
   * The categories to display.
   * Will be computed from the `days.[].shortDate` value.
   *
   * @type {array}
   */
  categories: computed.mapBy('days', 'shortDate'),

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

  /**
   * The numeral tooltip format, e.g. 0,0
   */
  tooltipFormat: null,

  /**
   * The numeral y-axis label format, e.g. 0.[0]a
   */
  labelFormat: null,

  series: computed(function() {
    const data = this.get('data') || [];
    const name = this.get('label');
    return [{
      name,
      data,
    }];
  }),

  extremes: computed('data.length', function() {
    const length = this.get('data.length');
    if (length > 1) return { min: 0.5, max: length - 1.5 };
    return {};
  }),

  options: computed(function() {
    const component = this;
    return {
      chart: { type: 'areaspline' },
      legend: { enabled: false },
      title: { text: false },
      xAxis: {
        categories: this.get('categories'),
        min: this.get('extremes.min'),
        max: this.get('extremes.max'),
        minRange: 1,
      },
      tooltip: {
        formatter: function() {
          const format = component.get('tooltipFormat');
          const value = format ? numeral(this.y).format(format) : this.y;
          const { index, color } = this.point;
          const longDate = component.get(`days.${index}.longDate`);
          return `<strong>${longDate}</string><br/>
            <span style="color:${color}">\u25CF</span> ${this.series.name}: <b>${value}</b>
          `;
        },
      },
      yAxis: {
        title: { text: this.get('label') },
        labels: {
          formatter: function() {
            const format = component.get('labelFormat');
            return format ? numeral(this.value).format(format) : this.value;
          },
        },
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
    chart.xAxis[0].setExtremes(this.get('extremes.min'), this.get('extremes.max'), false);
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
