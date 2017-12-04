import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Timestampable from './mixins/timestampable';

export default Model.extend(Timestampable, {
  name    : attr('string', { defaultValue: 'New Tenant' }),
  key     : attr('string'),
  photoURL: attr('string'),
  users   : hasMany('core-account-user', { inverse : 'account' }),
});
