import Component from '@ember/component';
import { computed } from '@ember/object';
import InitValueMixin from 'fortnight/mixins/init-value';
import ActionMixin from 'fortnight/mixins/action';

export default Component.extend(ActionMixin, InitValueMixin, {
  selectedKey: null,
  options: null,

  selected: computed('selectedKey', 'options.@each.key', function() {
    return this.get('options').find(option => option.key === this.get('selectedKey'));
  }),

  disabled: false,

  init() {
    this._super(...arguments);
    this.initValue('options', []);
  },

  actions: {
    setMetric(metric) {
      this.set('selectedKey', metric.key);
      this.sendEventAction('onchange', metric);
    }
  },
});
