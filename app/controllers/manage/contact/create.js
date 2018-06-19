import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/create-contact';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async create({ email, givenName, familyName }) {
      this.startAction();
      const payload = { email, givenName, familyName };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createContact');
        this.get('notify').info('Contact successfully created.');
        return this.transitionToRoute('manage.contact.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
