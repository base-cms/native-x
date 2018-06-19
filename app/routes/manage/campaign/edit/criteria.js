import Route from '@ember/routing/route';
import { get } from '@ember/object';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import moment from 'moment';

import query from 'fortnight/gql/queries/campaign/criteria';

export default Route.extend(RouteQueryManager, {
  model() {
    const { id } = this.modelFor('manage.campaign.edit');
    const variables = { input: { id } };
    return this.get('apollo').watchQuery({ query, variables, refetchPolicy: 'network-only' }, 'campaign');
  },

  afterModel(model) {
    const criteria = {
      start: moment().startOf('day'),
      end: null,
      placements: [],
      kvs: [],
    };
    if (!get(model, 'criteria')) model.criteria = criteria;
  },
});
