import Component from '@ember/component';
import InitValueMixin from 'fortnight/mixins/init-value';

export default Component.extend(InitValueMixin, {
  selected: null,
  options: null,

  disabled: false,

  init() {
    this._super(...arguments);
    this.initValue('metricOptions', []);
  },
});
