import Component from '@ember/component';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import query from 'fortnight/gql/queries/campaign/metrics';

export default Component.extend(ActionMixin, ObjectQueryManager, {
  didInsertElement() {
    this.query();
  },

  async query() {
    this.startAction();
    const input = { hash: this.get('hash'), advertiserId: this.get('advertiserId') };
    const variables = { input };
    try {
      const { metrics } = await this.get('apollo').query({ query, variables }, 'campaignHash');
      this.set('metrics', metrics);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.endAction();
    }
  },

});
