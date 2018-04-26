import Controller from '@ember/controller';

export default Controller.extend({
  isChangePasswordOpen: false,

  actions: {
    displayChangePassword() {
      this.set('isChangePasswordOpen', true);
    },
  },

});

