import Controller from '@ember/controller';
import mutation from 'fortnight/gql/mutations/set-campaign-contacts';

import { inject } from '@ember/service';

export default Controller.extend({
  apollo: inject(),

  actions: {
    setContacts(type, contacts) {
      const id = this.get('model.id');
      const contactIds = contacts.map(contact => contact.id);
      const variables = { input: { id, type, contactIds } };
      const resultKey = 'setCampaignContacts';
      const refetchQueries = ['campaign'];
      return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  },

});
