import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';
import moment from 'moment';

import query from 'fortnight/gql/queries/dashboard/daily-metrics';

export default Route.extend(RouteQueryManager, {
  model() {
    const day = moment().startOf('day').valueOf();
    const variables = { day };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'dailyCampaignMetrics');
  },
});
