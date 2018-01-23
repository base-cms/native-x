import Base from 'ember-simple-auth/authorizers/base';
import { isEmpty } from '@ember/utils';

export default Base.extend({
  authorize(sessionData, block) {
    if (!isEmpty(sessionData.token)) {
      block('Authorization', `Bearer ${sessionData.token}`);
    }
  },
});
