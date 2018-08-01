import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateUser from 'fortnight/gql/mutations/user/update';
import deleteUser from 'fortnight/gql/mutations/user/delete';
import undeleteUser from 'fortnight/gql/mutations/user/undelete';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     */
    async update() {
      this.startAction();
      const {
        id,
        email,
        givenName,
        familyName,
      } = this.get('model');

      const payload = { email, givenName, familyName };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation: updateUser, variables }, 'updateUser');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Deletes the user
     *
     */
    async delete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deleteUser;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteUser');
        await this.transitionToRoute('manage.user.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Restores (undeletes) the user
     *
     */
    async undelete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = undeleteUser;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'undeleteUser');
        await this.transitionToRoute('manage.user.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
