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
     * @param {object} fields
     */
    async create({ name, publisher }) {
      this.startAction();
      const payload = { name, publisherId: get(publisher || {}, 'id') };
      const variables = { input: { payload } };
      try {
        if (!payload.publisherId) throw new Error('You must select a publisher to continue.');
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
