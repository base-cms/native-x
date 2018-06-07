import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return {
      isNew: true,
      externalLinks: [],
    };
  },
});

