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
      const refetchQueries = ['EditTopicPlacements'];
      try {
        await this.get('placementManager').create(this.get('model'), { refetchQueries });
        return this.transitionToRoute('manage.topic.edit.placements');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
