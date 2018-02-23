import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';
import Timestampable from './mixins/timestampable';
import { computed } from '@ember/object';

export default Model.extend(Timestampable, {
  name            : computed('givenName', 'familyName', function() {
    return `${this.get('givenName')} ${this.get('familyName')}`
  }),
  givenName       : attr('string'),
  familyName      : attr('string'),
  email           : attr('string'),
  tenants         : hasMany('core-account-user', { inverse : 'user' }),
  activeTenantId  : attr('string'),
  photoURL        : attr('string'),
  password        : attr('string'),
});
