import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'fortnight/gql/mutations/create-placement';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    return { name: '' };
  },

  renderTemplate(controller, model) {
    this.render();
    this.render('placement.actions.create', { outlet: 'actions', into: 'application' });
  },

  actions: {
    create({ name, publisher }) {
      const resultKey = 'createPlacement';
      if (!publisher) {
        return this.get('errorProcessor').show(new Error('You must specify a publisher.'));
      }
      const publisherId = publisher.id;
      const payload = { name, publisherId };
      const variables = { input: { payload } };
      const refetchQueries = ['placement', 'AllPlacements'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('placement.edit', response.id))
        .then(() => this.get('notify').info('Placement created.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
