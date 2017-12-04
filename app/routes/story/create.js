import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    const tenant = this.user.get('tid');
    return this.store.createRecord('story', { tenant });
  },
});
