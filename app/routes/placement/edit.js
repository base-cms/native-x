import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import query from 'fortnight/gql/queries/placement';
import mutation from 'fortnight/gql/mutations/update-placement';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'placement');
  },

  actions: {
    async update({ id, name, publisher }) {
      this.startRouteAction();
      const payload = { name, publisherId: get(publisher || {}, 'id') };
      const variables = { input: { id, payload } };
      try {
        if (!payload.publisherId) throw new Error('You must select a publisher to continue.');
        await this.get('apollo').mutate({ mutation, variables }, 'updatePlacement');
        this.get('notify').info('Placement successfully saved.');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    },

    async delete() {
      this.get('notify').warning('Deleting objects is not yet supported.');
    },
  }
});

