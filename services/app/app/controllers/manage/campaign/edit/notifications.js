import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import { all } from 'rsvp';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/contacts';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    async update({ id, notify }) {
      this.startAction();
      const promises = [];
      ['internal', 'external'].forEach((type) => {
        const contacts = get(notify, type) || [];
        const contactIds = contacts.map(contact => get(contact, 'id'));
        const variables = { input: { id, type, contactIds } };
        promises.push(this.get('apollo').mutate({ mutation, variables }, 'campaignContacts'));
      });
      try {
        await all(promises);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },

});
