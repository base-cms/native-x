import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/create-placement';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model() {
    return {};
  },

  actions: {
    async create({ name, publisher }) {
      this.startRouteAction();
      const payload = { name, publisherId: publisher.id };
      const variables = { input: { payload } };
      try {
        const response = await this.apollo.mutate({ mutation, variables }, 'createPlacement');
        this.get('notify').info('Placement successfully created.');
        return this.transitionTo('placement.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    }
  }
});
