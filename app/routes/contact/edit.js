import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/contact';
import mutation from 'fortnight/gql/mutations/update-contact';

export default Route.extend(RouteQueryManager, {

  model({ id }) {
    const resultKey = 'contact';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  renderTemplate() {
    this.render();
    this.render('contact.actions.edit', { outlet: 'actions', into: 'application' });
  },

  actions: {
    update({ id, email, givenName, familyName }) {
      const resultKey = 'updateContact';
      const payload = { email, givenName, familyName };
      const variables = { input: { id, payload } };
      const refetchQueries = ['contact', 'AllContacts'];
      return this.apollo.mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.get('notify').info('Contact saved.'))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
