import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Timestampable from './mixins/timestampable';

export default Model.extend(Timestampable, {
  account : belongsTo('core-account'),
  user    : belongsTo('core-user'),
});
