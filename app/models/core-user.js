import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Timestampable from './mixins/timestampable';

export default Model.extend(Timestampable, {
  givenName       : attr('string'),
  familyName      : attr('string'),
  email           : attr('string'),
  tenants         : hasMany('core-account'),
  activeTenantId  : attr('string'),
  photoURL        : attr('string'),
});
