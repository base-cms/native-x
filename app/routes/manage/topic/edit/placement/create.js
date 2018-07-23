import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    const topic = this.modelFor('manage.topic.edit');
    const publisher = topic.get('publisher');
    return {
      topic,
      publisher,
    };
  },
});

