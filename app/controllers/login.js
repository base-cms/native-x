import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  username: null,
  password: null,
  errorMessage: null,
  session: inject(),

  isLoading: false,

  actions: {
    async authenticate() {
      this.set('isLoading', true);
      this.set('errorMessage', null);
      const { username, password } = this.getProperties('username', 'password');
      try {
        await this.get('session').authenticate('authenticator:application', username, password);
      } catch (e) {
        this.set('errorMessage', e.errors.length ? e.errors[0].message : 'An unknown error has occurred.');
      } finally {
        this.set('isLoading', false)
      }
    }
  }
});
