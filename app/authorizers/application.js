import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { isEmpty, inject: { service } } = Ember;

export default Base.extend({

  session: service('session'),

  authorize(sessionData, block) {
    const token     = sessionData['token'];

    if (!isEmpty(token)) {
      block('Authorization', `Bearer ${token}`);
    }
  }
});
