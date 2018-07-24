import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const publisher = this.modelFor('manage.publisher.edit');
    return {
      publisher,
    };
  },
});

