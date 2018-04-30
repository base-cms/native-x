import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get } from '@ember/object';
import ActionMixin from 'fortnight/mixins/action-mixin';

import mutation from 'fortnight/gql/mutations/campaign/update-details';

export default Controller.extend(ActionMixin, {
  apollo: inject(),
  campaignStatus: inject(),

  actions: {
    async update({ id, name, description, advertiser, url, externalLinks, status }) {
      this.startAction();
      const payload = {
        name,
        description,
        advertiserId: get(advertiser || {}, 'id'),
        url,
        externalLinks: externalLinks.map(link => ({ label: link.label, url: link.url })),
        status,
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
  },
});
