import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import query from 'fortnight/gql/queries/advertiser';
import mutation from 'fortnight/gql/mutations/update-advertiser';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'advertiser');
  },

  actions: {
    async update({ id, name, logo }) {
      this.startRouteAction();
      const payload = { name, logo };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateAdvertiser');
        this.get('notify').info('Advertiser successfully saved.');
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

