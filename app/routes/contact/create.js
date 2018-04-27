import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/create-contact';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model() {
    return {};
  },

  actions: {
    async create({ email, givenName, familyName }) {
      this.startRouteAction();
      const payload = { email, givenName, familyName };
      const variables = { input: { payload } };
      try {
        const response = await this.apollo.mutate({ mutation, variables }, 'createContact');
        this.get('notify').info('Contact successfully created.');
        return this.transitionTo('contact.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    }
  },
});

