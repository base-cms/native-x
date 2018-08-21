import Component from '@ember/component';
import { computed } from '@ember/object';
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

  init() {
    this._super(...arguments);
    this.initValue('data', []);
    this.initValue('categories', []);
  },
});
