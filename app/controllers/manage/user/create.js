import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/user/create';

export default Controller.extend(ActionMixin, {
  userRoles: inject(),
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async create() {
      this.startAction();
      const {
        email,
        password,
        confirmPassword,
        givenName,
        familyName,
      } = this.get('model');

      const payload = {
        email,
        password,
        confirmPassword,
        givenName,
        familyName,
      };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createUser');
        return this.transitionToRoute('manage.user.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    }
  },
});
