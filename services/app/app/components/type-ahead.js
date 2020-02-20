import Component from '@ember/component';
import { isArray } from '@ember/array';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';

import autocompletePublishers from 'fortnight/gql/queries/publisher/autocomplete';
import autocompleteAdvertisers from 'fortnight/gql/queries/autocomplete-advertisers';
import autocompleteContacts from 'fortnight/gql/queries/autocomplete-contacts';
import autocompletePlacements from 'fortnight/gql/queries/autocomplete-placements';
import autocompleteTemplates from 'fortnight/gql/queries/template/autocomplete';
import autocompleteStories from 'fortnight/gql/queries/story/autocomplete';

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

  required: false,

  wasFormValidated: false,
  invalidFeedback: 'Please select a value for this field.',

  isValid: computed('selected', 'selected.length', function() {
    if (!this.get('required')) return true;
    if (this.get('multiple')) {
      if (this.get('selected.legnth')) return true;
      return false;
    }
    if (this.get('selected')) return true;
    return false;
  }).readOnly(),

  _triggerClass: computed('triggerClass', 'wasFormValidated', 'isValid', function() {
    const triggerClass = this.get('triggerClass');
    if (!this.get('wasFormValidated')) return triggerClass;
    if (this.get('isValid')) return `${triggerClass} is-valid`;
    return `${triggerClass} is-invalid`;
  }).readOnly(),

  _closeOnSelect: computed('results.length', 'multiple', function() {
    const closeOnSelect = this.get('closeOnSelect');
    if (!this.get('multiple')) return closeOnSelect;
    return this.get('results.length') === 1 ? true : closeOnSelect;
  }).readOnly(),

  _query: computed('type', function() {
    const type = this.get('type');
    switch (type) {
      case 'publisher':
        return { query: autocompletePublishers, resultKey: 'autocompletePublishers' };
      case 'advertiser':
        return { query: autocompleteAdvertisers, resultKey: 'autocompleteAdvertisers' };
      case 'contact':
        return { query: autocompleteContacts, resultKey: 'autocompleteContacts' };
      case 'placement':
        return { query: autocompletePlacements, resultKey: 'autocompletePlacements' };
      case 'template':
        return { query: autocompleteTemplates, resultKey: 'autocompleteTemplates' };
      case 'story':
        return { query: autocompleteStories, resultKey: 'autocompleteStories' };
      default:
        this.get('graphErrors').show(new Error(`The model type ${type} is not searchable.`));
    }
  }).readOnly(),

  actions: {
    set(value) {
      this.set('selected', value);
      const fn = this.get('onChange');
      if (typeof fn === 'function') fn(value);
    },
  },

  search: task(function* (phrase) {
    const pagination = { first: 20 };
    const variables = { pagination, phrase };
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
