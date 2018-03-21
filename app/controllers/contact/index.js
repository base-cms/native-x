import Paginable from '../-paginable';

export default Paginable.extend({
  init() {
    this.set('queryParams', ['first', 'after', 'sortBy', 'ascending']);
    // Sort options are specific to the model in question.
    this.set('sortOptions', [
      { key: null, label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email Address' },
    ]);
    this._super(...arguments);
  },
});
