import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  models: null,
  routeName: null,
  totalCount: 0,
  hasNextPage: false,
  endCursor: null,
  first: 5,
  after: null,
  ascending: false,
  sortBy: null,
  sortOptions: null,
  limitOptions: null,

  init() {
    this.set('limitOptions', [5, 25, 50, 100, 200]);
    this._super(...arguments);
  },

  phrase: '',
  phraseInput: '',

  hasPreviousPage: computed('totalCount', 'after', function() {
    if (0 == this.get('totalCount')) return false;
    return null !== this.get('after');
  }),

  previousClass: computed('hasPreviousPage', function() {
    let base = 'btn btn-sm btn-block btn-outline-secondary';
    if (!this.get('hasPreviousPage')) return base += ' btn-disabled';
    return base;
  }),
  nextClass: computed('hasNextPage', function() {
    let base = 'btn btn-sm btn-block btn-outline-secondary';
    if (!this.get('hasNextPage')) return base += ' btn-disabled';
    return base;
  }),

  /**
   *
   */

  filteredSortOptions: computed('sortOptions', 'sortBy', 'isSortDisabled', function() {
    let filtered = this.get('sortOptions').rejectBy('key', this.get('sortBy'));
    if (!this.get('isSortDisabled')) {
      filtered = filtered.rejectBy('key', 'relevance');
    }
    return filtered;
  }),

  filteredLimitOptions: computed('limitOptions', 'first', function() {
    return this.get('limitOptions').reject(item => {
      return item === this.get('first');
    });
  }),

  isSortDisabled: computed('phraseInput.length', function() {
    return this.get('phraseInput.length') > 0;
  }),

  isSearchDisabled: computed('phraseInput', function() {
    // return true;
    return !this.get('phraseInput');
  }),

  selectedAscending: computed('ascending', 'isSortDisabled', function() {
    if (this.get('isSortDisabled')) {
      return true;
    }
    return this.get('ascending');
  }),

  selectedSort: computed('sortOptions', 'sortBy', 'isSortDisabled', function() {
    let key = this.get('isSortDisabled') ? 'relevance' : this.get('sortBy');
    return this.get('sortOptions').findBy('key', key);
  }),

  actions: {
    clearSearch() {
      this.set('phrase', '');
      this.set('phraseInput', '');
    },
    incrementPage(value) {
      this.set('page', this.get('page') + value);
    },
    resetPagination() {
      this.set('page', 1);
    },
    search() {
      this.set('phrase', this.get('phraseInput'));
      alert('Search NYI');
    },
    selectAll(event) {
      event.target.select();
    },
    toggleDirection() {
      this.set('ascending', !this.get('ascending'));
    },
  }

});
