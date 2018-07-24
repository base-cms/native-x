import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/topic/update';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     */
    async update() {
      const {
        id,
        name,
        publisher,
        externalId,
      } = this.get('model');

      this.startAction();
      const payload = {
        name,
        publisherId: get(publisher || {}, 'id'),
        externalId,
      };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateTopic');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
