import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  startMax: computed.reads('model.end'),
  startMin: moment().startOf('day'),
  endMin: computed.reads('model.start'),
  endMax: null,
});
