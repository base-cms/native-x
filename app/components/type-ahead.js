import Component from '@ember/component';
import { isArray } from '@ember/array';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import searchPublishers from 'fortnight/gql/queries/search-publishers';
import searchAdvertisers from 'fortnight/gql/queries/search-advertisers';

export default Component.extend(ComponentQueryManager, {
  closeOnSelect: true,
  allowClear: true,
  multiple: false,
  timeout: 600,
  type: null,

  field: 'name',
  disabled: false,
  selected: null,
  placeholder: null,

  _closeOnSelect: computed('results.length', 'multiple', function() {
    const closeOnSelect = this.get('closeOnSelect');
    if (!this.get('multiple')) return closeOnSelect;
    return this.get('results.length') === 1 ? true : closeOnSelect;
  }),

  _query: computed('type', function() {
    const type = this.get('type');
    switch (type) {
      case 'publisher':
        return { query: searchPublishers, resultKey: 'searchPublishers' };
      case 'advertiser':
        return { query: searchAdvertisers, resultKey: 'searchAdvertisers' };
    }
    this.get('graphErrors').show(new Error(`The model type ${type} is not searchable.`));
  }),

  search: task(function* (term) {
    const pagination = { first: 20 };
    const field = this.get('field');
    const search = { typeahead: { field, term } };
    const variables = { pagination, search };
    const { query, resultKey } = this.get('_query');
    const selected = this.get('selected') || [];
    const filterFrom = isArray(selected) ? selected : [ selected ];
    yield timeout(600);

    return this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey)
      .then(r => r.edges.map(i => i.node))
      .then(r => r.filter(i => filterFrom.filterBy('id', i.id).length === 0))
      .then((f) => {
        this.set('results', f);
        return f;
      })
      .catch(e => this.get('graphErrors').show(e))
    ;
  }),
});
