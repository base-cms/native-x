import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import mutation from 'fortnight/gql/mutations/create-contact';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model() {
    return { email: '' };
  },
  actions: {
    create({ email, givenName, familyName }) {
      const resultKey = 'createContact';
      const payload = { email, givenName, familyName };
      const variables = { input: { payload } };
      const refetchQueries = ['contact', 'allContacts'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(response => this.transitionTo('contact.edit', response.id))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
