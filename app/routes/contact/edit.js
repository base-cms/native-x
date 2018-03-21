import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/contact';
import mutation from 'fortnight/gql/mutations/update-contact';

export default Route.extend(RouteQueryManager, AuthenticatedRouteMixin, {

  model({ id }) {
    const resultKey = 'contact';
    const variables = { input: { id } };
    return this.apollo.watchQuery({ query, variables }, resultKey);
  },

  actions: {
    update({ id, email, givenName, familyName }) {
      const resultKey = 'updateContact';
      const payload = { email, givenName, familyName };
      const variables = { input: { id, payload } };
      const refetchQueries = ['contact', 'allContacts'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .then(() => this.refresh())
        .catch(e => this.get('errorProcessor').show(e))
      ;
    }
  }
})
