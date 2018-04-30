import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/create-publisher';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model() {
    return {};
  },

  actions: {
    async create({ name, logo }) {
      this.startRouteAction();
      const payload = { name, logo };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createPublisher');
        this.get('notify').success('Property successfully created.');
        return this.transitionTo('publisher.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    }
  }
})
