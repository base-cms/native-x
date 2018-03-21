import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  canSave: computed.notEmpty('model.email'),
});
