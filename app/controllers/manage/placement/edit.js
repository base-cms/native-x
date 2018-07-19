import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/update-placement';

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
        name,
        publisher,
        template,
        topic,
      } = this.get('model');

      const payload = {
        name,
        publisherId: get(publisher || {}, 'id'),
        templateId: get(template || {}, 'id'),
        topicId: get(topic || {}, 'id'),
      };
      const variables = { input: { id, payload } };
      try {
        if (!payload.publisherId) throw new Error('You must select a publisher to continue.');
        await this.get('apollo').mutate({ mutation, variables }, 'updatePlacement');
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
