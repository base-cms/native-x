import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/create-template';

const html = `{{build-container-attributes}}
{{build-beacon}}
{{#tracked-link href=href}}Link{{/tracked-link}}
`;

export default Route.extend(RouteQueryManager, ActionMixin, {
  model() {
    return { html, fallback: '' };
  },

  actions: {
    async create({ name, html, fallback }) {
      this.startRouteAction();
      const payload = { name, html, fallback };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createTemplate');
        this.get('notify').info('Template successfully created.');
        return this.transitionTo('manage.template.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endRouteAction();
      }
    }
  },
});
