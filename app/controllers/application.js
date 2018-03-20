import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  hideNav: false,

  session: inject(),

  displayNav: computed('hideNav', 'session.isAuthenticated', function() {
    if (!this.get('session.isAuthenticated')) {
      return false;
    }
    return (this.get('hideNav')) ? false : true;
  }),

});

