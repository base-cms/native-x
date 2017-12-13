import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Timestampable from './mixins/timestampable';
import Keyable from './mixins/keyable';

export default Model.extend(Timestampable, Keyable, {
  tenant          : attr('string'),
  name            : attr('string'),
  description     : attr('string'),
});
