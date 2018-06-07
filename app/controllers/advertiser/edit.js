import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import { all } from 'rsvp';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateAdvertiser from 'fortnight/gql/mutations/advertiser/update';
import setContacts from 'fortnight/gql/mutations/advertiser/set-contacts';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async update({ id, name, logo, notify }) {
      this.startAction();
      const promises = [];
      ['internal', 'external'].forEach((type) => {
        const contacts = get(notify, type) || [];
        const contactIds = contacts.map(contact => get(contact, 'id'));
        const variables = { input: { id, type, contactIds } };
        const mutation = setContacts;
        promises.push(this.get('apollo').mutate({ mutation, variables }, 'setAdvertiserContacts'));
      });
      const payload = { name, logo };
      const variables = { input: { id, payload } };
      const mutation = updateAdvertiser;

      try {
        await all(promises);
        await this.get('apollo').mutate({ mutation, variables }, 'updateAdvertiser');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    async delete() {
      this.get('notify').warning('Deleting objects is not yet supported.');
    },
  },
});
