import Component from '@ember/component';
import { computed } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action';

export default Component.extend(ActionMixin, {
  classNames: ['card'],

  /**
   * The chart start date.
   *
   * @type {Date}
   */
  startDate: null,

  /**
   * The chart end date.
   *
   * @type {Date}
   */
  endDate: null,

  /**
   * The currently selected metric key, e.g. `views`.
   *
   * @type {string}
   */
  metricKey: '',

  /**
   * An array of metric option objects.
   * For example:
   * `[ { key: 'views', label: 'Impressions' } ]`
   *
   * @type {object[]}
   */
  metricOptions: null,

  /**
   * Determines the selected metric option object, based on the `metricKey` value.
   *
   * @type {object}
   */
  selectedMetric: computed('metricKey', 'metricOptions.@each.key',  function() {
    return this.get('metricOptions').find(option => option.key === this.get('metricKey'));
  }),

  /**
   * Whether data for the chart is being loaded.
   *
   * @type {boolean}
   */
  isLoading: false,

  /**
   * The report data rows.
   *
   * Expects an object with `shortDate`, `longDate`, and `metrics`.
   * For example:
   * ```
   * [
   *   { shortDate: 'Aug 14', longDate: 'Tuesday, August 14th, 2018', metrics: { views: 24 } },
   *   { shortDate: 'Aug 15', longDate: 'Wednesday, August 15th, 2018', metrics: { views: 12 } },
   * ]
   * ```
   */
  rows: null,

  days: computed.map('rows.@each.{shortDate,longDate}', function({ shortDate, longDate }) {
    return { shortDate, longDate }
  }),

  data: computed('rows.[]', function() {
    const key = this.get('metricKey');
    const rows = this.get('rows') || [];
    return rows.map(row => row.metrics[key]);
  }),

  /**
   * Dispatches the change event.
   * Will send the `startDate`, `endDate`, and `selectedMetric` as an object
   * as the first argument, and the component instance as the second.
   */
  dispatchChange() {
    const {
      startDate,
      endDate,
      selectedMetric,
    } = this.getProperties('startDate', 'endDate', 'selectedMetric');
    this.sendEventAction('onchange', { startDate, endDate, selectedMetric }, this);
  },

  actions: {
    setMetric({ key }) {
      this.set('metricKey', key);
      this.dispatchChange();
    },
    setDates({ start, end }) {
      this.set('startDate', start);
      this.set('endDate', end);
      this.dispatchChange();
    },
  },
});
