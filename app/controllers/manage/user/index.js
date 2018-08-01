import ListController from '../abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'createdAt', label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'email', label: 'Email' },
      { key: 'givenName', label: 'First Name' },
      { key: 'familyName', label: 'Last Name' },
    ]);
    this.set('sortBy', 'updatedAt');
  },
});
