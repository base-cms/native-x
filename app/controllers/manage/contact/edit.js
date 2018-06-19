import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/update-contact';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async update({ id, email, givenName, familyName }) {
      this.startAction();
      const payload = { email, givenName, familyName };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateContact');
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
