import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/create-advertiser';

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
        const response = await this.apollo.mutate({ mutation, variables }, 'createAdvertiser');
        this.get('notify').info('Advertiser successfully created.');
        return this.transitionTo('advertiser.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    }
  },
});

