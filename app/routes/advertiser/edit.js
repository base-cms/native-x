import ListRoute from '../-list-route';
import gqlQuery from 'fortnight/gql/queries/advertiser';

export default ListRoute.extend({
  model(params) {
    return this.retrieveRecord(gqlQuery, 'advertiser', params.id);
  },
});
