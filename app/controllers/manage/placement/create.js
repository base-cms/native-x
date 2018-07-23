import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/create-placement';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     */
    async create() {
      this.startAction();
      const {
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
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createPlacement');
        this.get('notify').info('Placement successfully created.');
        return this.transitionToRoute('manage.placement.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    }
  },
});
