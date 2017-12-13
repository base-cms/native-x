import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Timestampable from './mixins/timestampable';
import Keyable from './mixins/keyable';

export default Model.extend(Timestampable, Keyable, {
  name    : attr('string', { defaultValue: 'New Tenant' }),
  apiKey  : attr('string'),
  photoURL: attr('string'),
  users   : hasMany('core-account-user', { inverse : 'account' }),
});
