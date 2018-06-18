import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updatePublisher from 'fortnight/gql/mutations/publisher/update';
import publisherLogo from 'fortnight/gql/mutations/publisher/logo';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    async setLogo(image) {
      this.startAction();
      const input = {
        id: this.get('model.id'),
        imageId: get(image || {}, 'id'),
      }
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: publisherLogo, variables }, 'publisherLogo');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     * @param {object} fields
     */
    async update({ id, name }) {
      this.startAction();
      const payload = { name };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation: updatePublisher, variables }, 'updatePublisher');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     */
    async delete() {
      this.get('notify').warning('Deleting objects is not yet supported.');
    },
  },
});
