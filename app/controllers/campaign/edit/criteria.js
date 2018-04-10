import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  startMax: computed.reads('model.criteria.end'),
  startMin: moment().startOf('day'),
  endMin: computed.reads('model.criteria.start'),
  endMax: null,
});
