import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/advertiser/create';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async create() {
      this.startAction();
      const { name, notify } = this.get('model');
      const internal = notify.internal.map(i => i.id);
      const external = notify.external.map(i => i.id);

      const payload = {
        name,
        notify: { internal, external },
      };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation, variables }, 'createAdvertiser');
        this.get('notify').info('Advertiser successfully created.');
        return this.transitionToRoute('manage.advertiser.edit', response.id);
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
