import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { all } from 'rsvp';
import { get } from '@ember/object';
import moment from 'moment';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateStory from 'fortnight/gql/mutations/story/update';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  startMin: moment().startOf('day'),

  actions: {
    /**
     *
     * @param {object} fields
     */
    async update({ id, advertiser, title, teaser, body, publishedAt }) {
      this.startAction();
      const promises = [];
      const payload = {
        title,
        teaser,
        body,
        advertiserId: get(advertiser || {}, 'id'),
        publishedAt: publishedAt ? publishedAt.valueOf() : null,
      };
      const variables = { input: { id, payload } };
      const mutation = updateStory;

      try {
        await all(promises);
        await this.get('apollo').mutate({ mutation, variables }, 'updateStory');
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
