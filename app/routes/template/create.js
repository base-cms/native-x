import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'fortnight/gql/mutations/create-template';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    return { name: '' };
  },

  renderTemplate(controller, model) {
    this.render();
    this.render('template.actions.create', { outlet: 'actions', into: 'application' });
  },

  actions: {
    create({ name, html, fallback }) {
      const resultKey = 'createTemplate';
      const payload = { name, html, fallback };
      const variables = { input: { payload } };
      const refetchQueries = ['template', 'AllTemplates'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('template.edit', response.id))
        .then(() => this.get('notify').info('Template created.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
