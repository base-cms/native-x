import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Timestampable from './mixins/timestampable';

export default Model.extend(Timestampable, {
  tenant          : attr('string'),
  name            : attr('string'),
  description     : attr('string'),
});
