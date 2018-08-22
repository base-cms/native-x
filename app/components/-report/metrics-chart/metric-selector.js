import Component from '@ember/component';
import InitValueMixin from 'fortnight/mixins/init-value';
import ActionMixin from 'fortnight/mixins/action';

export default Component.extend(ActionMixin, InitValueMixin, {
  /**
   * The metric options, as an array of metric objects.
   * For example:
   * `[ { key: 'views', label: 'Impressions' } ]`
   *
   * @type {object[]}
   */
  options: null,

  /**
   * The selected metric object, e.g. `{ key: 'views', label: 'Impressions' }`
   *
   * @type {object}
   */
  selected: null,

  /**
   * Whether the control is disabled.
   * Will not visibly change the control, but will not change the value if clicked.
   *
   * @type {boolean}
   */
  disabled: false,

  init() {
    this._super(...arguments);
    this.initValue('options', []);
  },

  actions: {
    setMetric(metric) {
      if (!this.get('disabled')) {
        this.sendEventAction('onchange', metric);
      }
    }
  },
});
