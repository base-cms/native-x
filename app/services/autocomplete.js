import Service, { inject } from '@ember/service';

import autocompletePublishers from 'fortnight/gql/queries/autocomplete-publishers';
import autocompleteAdvertisers from 'fortnight/gql/queries/autocomplete-advertisers';
import autocompleteContacts from 'fortnight/gql/queries/autocomplete-contacts';
import autocompletePlacements from 'fortnight/gql/queries/autocomplete-placements';

export default Service.extend({
  apollo: inject(),
  graphErrors: inject(),

  /**
   * Gets the query and result key for the provided type.
   *
   * @param {string} type
   */
  getQueryFor(type) {
    switch (type) {
      case 'publishers':
        return { query: autocompletePublishers, resultKey: 'autocompletePublishers' };
      case 'advertisers':
        return { query: autocompleteAdvertisers, resultKey: 'autocompleteAdvertisers' };
      case 'contacts':
        return { query: autocompleteContacts, resultKey: 'autocompleteContacts' };
      case 'placements':
        return { query: autocompletePlacements, resultKey: 'autocompletePlacements' };
      default:
        throw new Error(`The autocomplete type '${type}' is not registered.`);
    }
  },

  /**
   * Runs an autocomplete query.
   *
   * @param {string} type
   * @param {string} phrase
   * @param {object} options
   */
  async query(type, phrase, { pagination } = {}) {
    const variables = {
      pagination: pagination || { first: 20 },
      phrase,
    };
    const { query, resultKey } = this.getQueryFor(type);
    try {
      const results = await this.get('apollo').query({ query, variables, fetchPolicy: 'network-only' }, resultKey);
      return results.edges.map(edge => edge.node);
    } catch (e) {
      this.get('graphErrors').show(e);
    }
  },
});
