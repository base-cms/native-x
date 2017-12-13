import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import { fragmentArray } from 'ember-data-model-fragments/attributes';
import Timestampable from './mixins/timestampable';

export default Model.extend(Timestampable, {
  tenant          : attr('string'),
  name            : attr('string'),
  start           : attr('moment'),
  end             : attr('moment'),
  advertiser      : belongsTo('advertiser'),
  order           : belongsTo('order'),
  creatives       : hasMany('creative'),
  placements      : hasMany('placement'),
  criteria        : fragmentArray('embeds/key-val'),
});
