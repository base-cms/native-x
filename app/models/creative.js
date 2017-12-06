import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Timestampable from './mixins/timestampable';

export default Model.extend(Timestampable, {
  tenant          : attr('string'),
  linkTitle       : attr('string'),
  linkUrl         : attr('string'),
  imageUrl        : attr('string'),
  name            : attr('string'),
  teaser          : attr('string'),
  advertiser      : belongsTo('advertiser'),
});
