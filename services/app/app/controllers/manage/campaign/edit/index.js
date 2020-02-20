import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get, computed } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/update';
import pauseCampaign from 'fortnight/gql/mutations/campaign/pause';
import deleteCampaign from 'fortnight/gql/mutations/campaign/delete';
import cloneCampaign from 'fortnight/gql/mutations/campaign/clone';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  active: computed('model.paused', function() {
    return !this.get('model.paused');
  }),

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

    /**
     * Clones the campaign
     */
    async clone() {
      this.startAction();
      this.set('isCloning', true);
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = cloneCampaign;
      try {
        const campaign = await this.get('apollo').mutate({ mutation, variables }, 'cloneCampaign');
        await this.transitionToRoute('manage.campaign.edit.index', get(campaign, 'id'));
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
        this.set('isCloning', false);
      }
    },

    async togglePaused(active) {
      this.startAction();

      const paused = !active;
      const id = this.get('model.id');

      this.set('model.paused', paused);

      const variables = { id, paused };
      const mutation = pauseCampaign;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'pauseCampaign');
      } catch (e) {
        this.set('model.paused', !paused);
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
