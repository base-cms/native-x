import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import deleteTemplate from 'fortnight/gql/mutations/template/delete';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     * Deletes the template
     *
     */
    async delete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deleteTemplate;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteTemplate');
        await this.transitionToRoute('manage.template.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
