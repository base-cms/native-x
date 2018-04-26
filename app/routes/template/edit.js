import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/template';
import mutation from 'fortnight/gql/mutations/update-template';

export default Route.extend(RouteQueryManager, {

  model({ id }) {
    const resultKey = 'template';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  renderTemplate() {
    this.render();
    this.render('template.actions.edit', { outlet: 'actions', into: 'application' });
  },

  actions: {
    update({ id, name, html, fallback }) {
      const resultKey = 'updatePlacement';
      const payload = { name, html, fallback };
      const variables = { input: { id, payload } };
      const refetchQueries = ['template', 'AllTemplates'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.get('notify').info('Template saved.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
