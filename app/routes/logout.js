import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    this.user.logout().then(this.transitionTo('index'))
  }
});
