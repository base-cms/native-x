import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Timestampable from './mixins/timestampable';

export default Model.extend(Timestampable, {
  tenant          : attr('string'),
  name            : attr('string'),
  orders          : hasMany('order', { inverse: 'advertiser' }),
});
