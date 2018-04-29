import Component from '@ember/component';

export default Component.extend({
  isModalShowing: false,

  actions: {
    addLink(link, hide) {
      this.get('onLinkAdded')(link);
      hide();
    },
    displayModal() {
      this.set('isModalShowing', true);
      this.set('link', { label: '', url: '' });
    },
  },
});
