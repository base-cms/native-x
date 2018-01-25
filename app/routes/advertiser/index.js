import ListRoute from '../-list-route';
import gqlQuery from 'fortnight/gql/queries/all-advertisers';

export default ListRoute.extend({
  model(params) {
    return this.retrieveModel(gqlQuery, 'allAdvertisers', params);
  },
});
