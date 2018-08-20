import Component from '@ember/component';
import InitValueMixin from 'fortnight/mixins/init-value';
import ActionMixin from 'fortnight/mixins/action';
import moment from 'moment';

export default Component.extend(ActionMixin, InitValueMixin, {
  center: null,

  disabled: false,

  init() {
    this._super(...arguments);
    const endDate = this.get('range.end');
    this.initValue('center', endDate ? moment(endDate) : moment());
  },

  actions: {
    setRange(range) {
      this.set('range', range);
      const { start, end } = range;
      if (start && end) this.sendEventAction('onchange', range);
    }
  },
});
