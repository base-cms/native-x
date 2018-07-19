import Service, { inject } from '@ember/service';

import autocompletePublishers from 'fortnight/gql/queries/autocomplete-publishers';
import autocompleteAdvertisers from 'fortnight/gql/queries/autocomplete-advertisers';
import autocompleteContacts from 'fortnight/gql/queries/autocomplete-contacts';
import autocompletePlacements from 'fortnight/gql/queries/autocomplete-placements';
import autocompleteTemplates from 'fortnight/gql/queries/template/autocomplete';
import autocompletePublisherTopics from 'fortnight/gql/queries/topic/publisher-autocomplete';

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
      case 'template':
        return { query: autocompleteTemplates, resultKey: 'autocompleteTemplates' };
      case 'publisher-topic':
        return { query: autocompletePublisherTopics, resultKey: 'autocompletePublisherTopics' };
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
   * @param {object} options.pagination
   * @param {object} options.vars
   */
  async query(type, phrase, { pagination, vars } = {}) {
    const variables = {
      pagination: pagination || { first: 20 },
      phrase,
      ...vars,
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
