import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

export default Controller.extend(ActionMixin, {
  placementManager: inject(),

  actions: {
    /**
     *
     */
    async update() {
      this.startAction();
      const model = this.get('model');
      try {
        await this.get('placementManager').update(model.get('id'), model);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
