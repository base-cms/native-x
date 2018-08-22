import Component from '@ember/component';
import ActionMixin from 'fortnight/mixins/action';

export default Component.extend(ActionMixin, {
  isLoading: false,

  didInsertElement() {
    this.sendEventAction('oninsert', this);
  },
});
