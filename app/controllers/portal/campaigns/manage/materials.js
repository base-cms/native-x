import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  canRemoveCreatives: computed('model.campaign.creatives.length', function() {
    return this.get('model.campaign.creatives.length') > 1;
  }),
});
