import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import ActionMixin from 'fortnight/mixins/action-mixin';

import { get } from '@ember/object';
import { isPresent } from '@ember/utils';
import moment from 'moment';

import query from 'fortnight/gql/queries/campaign/criteria';

export default Route.extend(RouteQueryManager, ActionMixin, {
  model() {
    const { id } = this.modelFor('campaign.edit');
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables }, 'campaign');
  },

  afterModel(model) {
    const criteria = {
      start: moment(),
      end: null,
      placements: [],
      kvs: [],
    };
    if (!get(model, 'criteria')) model.criteria = criteria;
  },

  // doUpdate() {
  //   const controller = this.controllerFor('campaign.edit.criteria');
  //   controller.set('isSaving', true);
  //   const model = this.modelFor('campaign.edit.criteria');
  //   const { id, criteria } = model;
  //   const { start, end, kvs, placements } = criteria;
  //   const keyValues = kvs.map(({ key, value }) => {
  //     return { key, value };
  //   });
  //   const campaignId = id;
  //   const placementIds = placements.map(p => p.id);
  //   const startDate = moment(start).format('x');
  //   const endDate = isPresent(end) ? moment(end).format('x') : null;
  //   const payload = { start: startDate, end: endDate, placementIds, kvs: keyValues };
  //   const variables = { input: { campaignId, payload } };
  //   const resultKey = 'setCampaignCriteria';
  //   const refetchQueries = ['campaign', 'campaignCriteria'];
  //   return this.get('apollo').mutate({ mutation, variables, refetchQueries }, resultKey)
  //     .then(() => controller.setProperties({ isSaving: false, hasSaved: true }))
  //     .catch(e => this.get('errorProcessor').show(e))
  //   ;
  // },
});
