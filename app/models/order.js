import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Timestampable from './mixins/timestampable';

export default Model.extend(Timestampable, {
  tenant          : attr('string'),
  name            : attr('string'),
  advertiser      : belongsTo('advertiser'),
  lineItems       : hasMany('line-item', { inverse: 'order' }),
});
