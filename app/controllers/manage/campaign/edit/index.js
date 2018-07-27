import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/update';
import deleteCampaign from 'fortnight/gql/mutations/campaign/delete';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  actions: {
    /**
     *
     */
    async update({ id, name, description, advertiser, story, url, externalLinks }) {
      this.startAction();
      const payload = {
        name,
        description,
        advertiserId: get(advertiser || {}, 'id'),
        storyId: get(story|| {}, 'id'),
        url,
        externalLinks: externalLinks.map(link => ({ label: link.label, url: link.url })),
      };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'updateCampaign');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Deletes the campaign
     */
    async delete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deleteCampaign;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteCampaign');
        return this.transitionToRoute('manage.campaign.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
