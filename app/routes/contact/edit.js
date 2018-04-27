import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import query from 'fortnight/gql/queries/contact';
import mutation from 'fortnight/gql/mutations/update-contact';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model({ id }) {
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'contact');
  },

  actions: {
    async update({ id, email, givenName, familyName }) {
      this.startRouteAction();
      const payload = { email, givenName, familyName };
      const variables = { input: { id, payload } };
      try {
        await this.apollo.mutate({ mutation, variables }, 'updateContact');
        this.get('notify').info('Contact successfully saved.');
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


