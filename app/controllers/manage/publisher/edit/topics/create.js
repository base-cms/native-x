import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/topic/create';

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
        externalId,
      } = this.get('model');

      const payload = { name, publisherId: get(publisher || {}, 'id'), externalId };
      const variables = { input: { payload } };
      const refetchQueries = ['EditPublisherTopics'];
      try {
        await this.get('apollo').mutate({ mutation, variables, refetchQueries }, 'createTopic');
        return this.transitionToRoute('manage.publisher.edit.topics');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    }
  },
});
