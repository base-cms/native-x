import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

export default Controller.extend(ActionMixin, {
  placementManager: inject(),

  actions: {
    /**
     *
     */
    async create() {
      this.startAction();
      try {
        const response = await this.get('placementManager').create(this.get('model'));
        return this.transitionToRoute('manage.placement.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
