import Route from '@ember/routing/route';
import { get } from '@ember/object';
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
      const payload = { name, publisherId: get(publisher || {}, 'id') };
      const variables = { input: { payload } };
      try {
        if (!payload.publisherId) throw new Error('You must select a publisher to continue.');
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createPlacement');
        this.get('notify').info('Placement successfully created.');
        return this.transitionTo('placement.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    }
  },
});
