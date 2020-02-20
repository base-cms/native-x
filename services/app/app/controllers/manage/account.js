import Controller from '@ember/controller';
import { inject } from '@ember/service';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateAccount from 'fortnight/gql/mutations/account/update';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async update() {
      this.startAction();
      const {
        id,
        name,
        settings,
      } = this.get('model');

      const payload = {
        name,
        settings: {
          reservePct: settings.reservePct || 0,
          requiredCreatives: settings.requiredCreatives || 1,
          googleTagManagerId: settings.googleTagManagerId || null,
        },
      };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation: updateAccount, variables }, 'updateAccount');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
