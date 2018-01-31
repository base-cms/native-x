import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  /**
   * Query params
   */
  queryParams: ['first', 'after', 'sortBy', 'ascending'],
  first: 5,
  after: null,
  ascending: false,
  sortBy: null,

  /**
   * Pagination
   */
  totalCount: 0,
  hasNextPage: false,
  endCursor: null,

  // Sort options are specific to the model in question.
  sortOptions: [
    { key: null, label: 'Created' },
    { key: 'updatedAt', label: 'Updated' },
    { key: 'name', label: 'Name' },
  ],

});
