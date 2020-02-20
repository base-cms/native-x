import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateCurrentUserProfile from 'fortnight/gql/mutations/update-current-user-profile';

export default Component.extend(ComponentQueryManager, ActionMixin, {
  model: null,

  isOpen: false,

  actions: {
    async saveProfile() {
      this.startAction();
      const mutation = updateCurrentUserProfile;
      const { givenName, familyName } = this.get('model');
      const input = { givenName, familyName };
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateCurrentUserProfile');
        this.set('isOpen', false);
        this.get('notify').info('User profile successfully updated.');
      } catch (e) {
        this.get('graphErrors').show(e)
      } finally {
        this.endAction()
      }
    },
  },

});
