import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import query from 'fortnight/gql/queries/template';
import mutation from 'fortnight/gql/mutations/update-template';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model({ id }) {
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'template').then((template) => {
      if (!template.fallback) template.fallback = '';
      return template;
    });
  },

  actions: {
    async update({ id, name, html, fallback }) {
      this.startRouteAction();
      const payload = { name, html, fallback };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateTemplate');
        this.get('notify').info('Template successfully saved.');
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
