import inView from 'element-in-view';
import throttle from 'lodash.throttle';

const attr = 'data-fortnight-view';

const getPendingElements = () => document.querySelectorAll(`[${attr}="pending"]`);
const getSentElements = () => document.querySelectorAll(`[${attr}="sent"]`);

const loadBeacon = (node) => {
  if (inView(node)) {
    node.setAttribute(attr, 'sent');
    const src = node.getAttribute('data-fortnight-beacon');
    if (src) {
      const img = new Image();
      img.src = src;
    }
  }
};

const clearBeacon = (node) => {
  if (!inView(node)) node.setAttribute(attr, 'pending');
};

const handler = throttle(() => {
  /**
   * Find all in-view, pending elements and send
   */
  getPendingElements().forEach(loadBeacon);

  /**
   * Find all out-of-view, sent elements and mark as pending
   */
  getSentElements().forEach(clearBeacon);
}, 200);

document.addEventListener('DOMContentLoaded', () => {
  /**
   * On initial page load, find all pending elements and load the beacon, if in view.
   */
  getPendingElements().forEach(loadBeacon);

  if (window.MutationObserver) {
    /**
     * When new nodes are added, check for pending attribute.
     * If in-view, fire.
     */
    new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          Array.prototype.slice.call(mutation.addedNodes)
            .filter(node => node.getAttribute(attr) === 'pending')
            .forEach(loadBeacon);
        }
      });
    }).observe(document.body, { childList: true, subtree: true });
  }
});

window.addEventListener('scroll', handler);
window.addEventListener('resize', handler);
