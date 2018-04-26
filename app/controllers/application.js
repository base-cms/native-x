import Controller from '@ember/controller';

export default Controller.extend({
  isChangePasswordOpen: false,
  isUpdateProfileOpen: false,

  actions: {
    displayChangePassword() {
      this.set('isChangePasswordOpen', true);
    },
    displayUpdateProfile() {
      this.set('isUpdateProfileOpen', true);
    },
  },

});

