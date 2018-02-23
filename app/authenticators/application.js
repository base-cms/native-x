import Base from 'ember-simple-auth/authenticators/base';
import { inject } from '@ember/service';


export default Base.extend({
  auth: inject(),

  restore(data) {
    return this.get('auth').check(data.token);
  },

  authenticate(email, password) {
    return this.get('auth').submit(email, password);
  },

  invalidate(data) {
    return this.get('auth').delete(data.token);
  },
});
