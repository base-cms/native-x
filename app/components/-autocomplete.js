import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import advertiserQuery from 'fortnight/gql/queries/search-advertisers';
import publisherQuery from 'fortnight/gql/queries/search-publishers';
import placementQuery from 'fortnight/gql/queries/search-placements';
import contactQuery from 'fortnight/gql/queries/search-contacts';

export default Component.extend(ComponentQueryManager, {
  errorProcessor: inject(),

  type: null,
  field: 'name',
  selected: null,
  placeholder: null,

  _query: computed('type', function() {
    const type = this.get('type');
    switch (type) {
      case 'advertiser':
        return { query: advertiserQuery, resultKey: 'searchAdvertisers.edges' };
      case 'publisher':
        return { query: publisherQuery, resultKey: 'searchPublishers.edges' };
      case 'placement':
        return { query: placementQuery, resultKey: 'searchPlacements.edges' };
      case 'contact':
        return { query: contactQuery, resultKey: 'searchContacts.edges' };
    }
    this.get('errorProcessor').show(new Error(`The model type ${type} is not searchable.`));
  }),

  _pagination: computed('type', 'term', 'page', function() {
    // @todo this should actually be paginated, probably
    return { first: 20 };
  }),

  search: task(function* (term) {
    const pagination = this.get('_pagination');
    const field = this.get('field');
    const search = { typeahead: { field, term } };
    const variables = { pagination, search };
    const { query, resultKey } = this.get('_query');
    const selected = this.get('selected') || [];
    yield timeout(600);
    return this.apollo.watchQuery({ query, variables }, resultKey)
      .then(r => r.map(i => i.node))
      .then(r => r.filter(i => selected.filterBy('id', i.id).length === 0))
      .catch(e => this.get('errorProcessor').show(e))
    ;
  }),
});
