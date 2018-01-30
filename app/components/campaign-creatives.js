import Component from '@ember/component';
import { isArray } from '@ember/array';
import { computed } from '@ember/object';
import { isPresent } from '@ember/utils';
import { inject } from '@ember/service';

import ComponentQueryManager from "ember-apollo-client/mixins/component-query-manager";

import mutation from 'fortnight/gql/mutations/add-campaign-creative';
import { bool } from '@ember/object/computed';

export default Component.extend(ComponentQueryManager, {
  errorProcessor: inject(),

  campaign: null,
  onAdd: 'onAdd',

  creatives: computed.reads('campaign.creatives'),

  actions: {
    add() {
      const { id } = this.get('campaign');
      const variables = { input: { id } };
      const resultKey = 'addCampaignCreative';
      console.warn('campaign-creatives.add()', { mutation, variables }, resultKey);
      return this.apollo.mutate({ mutation, variables }, resultKey)
        // .then(this.sendAction(this.get('onAdd')))
        .catch(e => this.get('errorProcessor').show(e))
      ;
    },
  },

});
