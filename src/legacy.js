import inView from 'element-in-view';
import throttle from 'lodash.throttle';

export default function legacy() {
  const attr = 'data-fortnight-view';

  const getPendingElements = () => document.querySelectorAll(`[${attr}="pending"]`);

  const loadBeacon = (node) => {
    if (inView(node)) {
      node.setAttribute(attr, 'sent');
      const src = node.getAttribute('data-fortnight-beacon');
      if (src) {
        const a = document.createElement('a');
        a.href = src;
        const now = Date.now();
        const qs = (a.search) ? `${a.search}&_=${now}` : `?_=${now}`;
        a.search = qs;
        const img = new Image();
        img.src = a.href;
      }
    }
  };

  const handler = throttle(() => {
    /**
     * Find all in-view, pending elements and send
     */
    getPendingElements().forEach(loadBeacon);
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
              .filter(node => node.nodeType === Node.ELEMENT_NODE)
              .filter(node => node.getAttribute(attr) === 'pending')
              .forEach(loadBeacon);
          }
        });
      }).observe(document.body, { childList: true, subtree: true });
    }
  });

  window.addEventListener('scroll', handler);
  window.addEventListener('resize', handler);
}
