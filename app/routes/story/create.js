import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const tenant = this.user.get('tid');
    return this.store.createRecord('story', { tenant });
  },
});
