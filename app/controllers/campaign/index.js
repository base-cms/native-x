import Controller from '@ember/controller';

export default Controller.extend({
  /**
   * Query params
   */
  queryParams: null,
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
  sortOptions: null,

  init() {
    this.set('queryParams', ['first', 'after', 'sortBy', 'ascending']);
    this.set('sortOptions', [
      { key: null, label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'name', label: 'Name' },
    ]);
    this._super(...arguments);
  },

  // dateUtil: inject(),

  // now: computed(function() {
  //   return this.get('dateUtil').getToday();
  // }),

  // startMin: computed.reads('now'),
  // startMax: computed('model.end', function() {
  //   const end = this.get('model.end');
  //   if (isPresent(end)) {
  //     return end;
  //   }
  //   return this.get('now');
  // }),

  // endMin: computed('model.start', function() {
  //   const start = this.get('model.start');
  //   if (isPresent(start)) {
  //     return start;
  //   }
  //   return this.get('now');
  // }),

  // endMax: null,
});
