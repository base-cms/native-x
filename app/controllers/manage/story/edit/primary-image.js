import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import storyPrimaryImage from 'fortnight/gql/mutations/story/primary-image';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async removePrimaryImage(storyId) {
      this.startAction();
      const mutation = storyPrimaryImage;
      const variables = { storyId };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'storyPrimaryImage');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
