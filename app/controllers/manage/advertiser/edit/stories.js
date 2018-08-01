import ListController from 'fortnight/controllers/manage/abstract-list';

export default ListController.extend({
  init() {
    this._super(...arguments);
    this.set('sortOptions', [
      { key: 'createdAt', label: 'Created' },
      { key: 'updatedAt', label: 'Updated' },
      { key: 'publishedAt', label: 'Published' },
      { key: 'name', label: 'Name' },
    ]);
    this.set('sortBy', 'updatedAt');
  },
});
