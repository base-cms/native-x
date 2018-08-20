import Component from '@ember/component';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import query from 'fortnight/gql/queries/campaign/metrics';

export default Component.extend(ActionMixin, ObjectQueryManager, {
  classNames: ['row'],

  init() {
    this._super(...arguments);
    this.query();
  },

  async query() {
    this.startAction();
    const variables = { input: { id: this.get('campaignId') } };
    try {
      const { metrics } = await this.get('apollo').query({ query, variables }, 'campaign');
      this.set('metrics', metrics);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.endAction();
    }
  },

});
