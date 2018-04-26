import Component from '@ember/component';
import { computed } from '@ember/object';
import LoadingMixin from 'fortnight/mixins/loading-mixin';

export default Component.extend(LoadingMixin, {
  classNames: ['loading', 'progress'],
  show: computed.readOnly('loadingDisplay.isShowing'),
});
