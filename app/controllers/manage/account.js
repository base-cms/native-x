import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async update() {
      // this.startAction();
      // const payload = { name, domainName };
      // const variables = { input: { id, payload } };
      // try {
      //   await this.get('apollo').mutate({ mutation: updatePublisher, variables }, 'updatePublisher');
      // } catch (e) {
      //   this.get('graphErrors').show(e);
      // } finally {
      //   this.endAction();
      // }
    },
  },
});
