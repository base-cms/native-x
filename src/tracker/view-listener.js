import { domReady, assign } from '../utils';

require('intersection-observer');

/**
 * Detects whether or not an intersection record is visible based on the threshold.
 *
 * @param {number} threshold
 * @param {IntersectionObserverEntry} record
 * @return {boolean}
 */
function isVisible(threshold, record) {
  if (threshold === 0) {
    const i = record.intersectionRect;
    return i.top > 0 || i.bottom > 0 || i.left > 0 || i.right > 0;
  }
  return record.intersectionRatio >= threshold;
}

/**
 * @todo We mant to explore including a MutationObserver polyfill.
 */
export default class ViewListener {
  constructor(tracker, options = {}) {
    // Disable if the browser does not support the required features.
    if (!(window.IntersectionObserver && window.MutationObserver)) return;

    const defaults = {
      trackOnce: true,
      threshold: 0.25,
      rootMargin: '0px',
    };
    this.opts = assign(defaults, options);

    // Bind methods.
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleMutations = this.handleMutations.bind(this);
    this.handleAddedElement = this.handleAddedElement.bind(this);
    this.handleRemovedElement = this.handleRemovedElement.bind(this);

    this.mutationObserver = null;
    this.intersectionObserver = null;

    this.elementMap = {};
    this.tracker = tracker;

    domReady(() => {
      this.observeElements();
    });
  }

  static getElementIds() {
    const ids = [];
    document.querySelectorAll('[id^="fortnight-"]').forEach(ele => ids.push(ele.id));
    return ids;
  }

  observeElements() {
    // Setup intersection observer.
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(this.handleIntersection, {
        rootMargin: this.opts.rootMargin,
        threshold: this.opts.threshold,
      });
      const ids = ViewListener.getElementIds();
      ids.forEach((id) => {
        const element = document.getElementById(id);
        this.elementMap[id] = element;
        if (element) this.intersectionObserver.observe(element);
      });
    }

    // Setup mutation observer.
    if (!this.mutationObserver) {
      this.mutationObserver = new MutationObserver(this.handleMutations);
      this.mutationObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    // https://bugs.chromium.org/p/chromium/issues/detail?id=612323
    requestAnimationFrame(() => {});
  }

  unobserveAllElements() {
    this.intersectionObserver.disconnect();
    this.intersectionObserver = null;

    this.mutationObserver.disconnect();
    this.mutationObserver = null;

    this.elementMap = {};
  }

  handleIntersection(records) {
    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      if (isVisible(this.opts.threshold, record)) {
        const { id } = record.target;
        this.sendEvent(id);
        if (this.opts.trackOnce) {
          this.handleRemovedElement(id);
        }
      }
    }
  }

  handleMutations(mutations) {
    mutations.forEach((mutation) => {
      const { addedNodes, removedNodes } = mutation;
      for (let r = 0; r < removedNodes.length; r += 1) {
        const removed = removedNodes[r];
        this.walkTree(removed, this.handleRemovedElement);
      }
      for (let a = 0; a < addedNodes.length; a += 1) {
        const added = addedNodes[a];
        this.walkTree(added, this.handleAddedElement);
      }
    });
  }

  handleAddedElement(id) {
    const element = this.elementMap[id] || document.getElementById(id);
    if (element) {
      this.intersectionObserver.observe(element);
    }
    this.elementMap[id] = element;
  }

  handleRemovedElement(id) {
    const element = this.elementMap[id] || document.getElementById(id);
    if (element) {
      this.intersectionObserver.unobserve(element);
    }
    this.elementMap[id] = null;
  }

  walkTree(node, callback) {
    if (node.nodeType === 1 && node.id.indexOf('fortnight-') === 0) {
      callback(node.id);
    }
    for (let i = 0; i < node.childNodes.length; i += 1) {
      const child = node.childNodes[i];
      this.walkTree(child, callback);
    }
  }

  sendEvent(id) {
    const element = this.elementMap[id] || document.getElementById(id);
    this.tracker.execute('event', 'view', { id: element.id }, { transport: 'beacon' });
  }

  destroy() {
    this.unobserveAllElements();
  }
}
