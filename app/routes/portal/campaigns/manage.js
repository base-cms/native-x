import Route from '@ember/routing/route';
import RouteQueryManager from 'ember-apollo-client/mixins/route-query-manager';

import query from 'fortnight/gql/queries/campaign/hash';

export default Route.extend(RouteQueryManager, {
  model({ campaign_hash }) {
    const advertiserId = this.modelFor('portal').get('id');
    const variables = { input: { hash: campaign_hash, advertiserId } };
    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'campaignHash');
  }
});

