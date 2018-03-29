import {
  domReady,
  extractFieldsFrom,
  isTrackable,
  logSupport,
} from '../utils';

logSupport(!window.IntersectionObserver, 'IntersectionObserver is not supported, polyfilling.', 'info');
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
 * @todo We may want to explore including a MutationObserver polyfill.
 */
export default class ViewListener {
  constructor(tracker, options = {}) {
    logSupport(!window.IntersectionObserver, 'IntersectionObserver polyfilling failed.');
    logSupport(!window.MutationObserver, 'MutationObserver is not supported, however initial elements will be fired.', 'info');

    // Disable if the browser does not support the required features.
    // Do not disable if mutations are not supported - just don't use it.
    if (!window.IntersectionObserver) return;

    const defaults = {
      trackOnce: true,
      threshold: 0.25,
      rootMargin: '0px',
    };
    this.opts = Object.assign(defaults, options);

    // Bind methods.
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleMutations = this.handleMutations.bind(this);
    this.handleAddedElement = this.handleAddedElement.bind(this);
    this.handleRemovedElement = this.handleRemovedElement.bind(this);

    this.mutationObserver = null;
    this.intersectionObserver = null;

    this.tracker = tracker;

    domReady(() => {
      this.observeElements();
    });
  }

  static getElements() {
    return document.querySelectorAll('[data-fortnight-action="view"]');
  }

  observeElements() {
    // Setup intersection observer.
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(this.handleIntersection, {
        rootMargin: this.opts.rootMargin,
        threshold: this.opts.threshold,
      });
      const elements = ViewListener.getElements();
      for (let i = 0; i < elements.length; i += 1) {
        const element = elements[i];
        this.intersectionObserver.observe(element);
      }
    }

    // Setup mutation observer, if supported.
    if (window.mutationObserver && !this.mutationObserver) {
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

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = null;
    }
  }

  handleIntersection(records) {
    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      if (isVisible(this.opts.threshold, record)) {
        const node = record.target;
        this.sendEvent(node);
        if (this.opts.trackOnce) {
          this.handleRemovedElement(node);
        }
      }
    }
  }

  handleMutations(mutations) {
    for (let i = 0; i < mutations.length; i += 1) {
      const mutation = mutations[i];
      const { addedNodes, removedNodes } = mutation;
      for (let r = 0; r < removedNodes.length; r += 1) {
        const removed = removedNodes[r];
        this.walkTree(removed, this.handleRemovedElement);
      }
      for (let a = 0; a < addedNodes.length; a += 1) {
        const added = addedNodes[a];
        this.walkTree(added, this.handleAddedElement);
      }
    }
  }

  handleAddedElement(node) {
    if (node) {
      this.intersectionObserver.observe(node);
    }
  }

  handleRemovedElement(node) {
    if (node) {
      this.intersectionObserver.unobserve(node);
    }
  }

  walkTree(node, callback) {
    if (isTrackable(node, 'view')) {
      callback(node);
    }
    for (let i = 0; i < node.childNodes.length; i += 1) {
      const child = node.childNodes[i];
      this.walkTree(child, callback);
    }
  }

  sendEvent(node) {
    const fields = extractFieldsFrom(node);
    this.tracker.execute('event', 'view', fields, { transport: 'beacon' });
  }

  destroy() {
    this.unobserveAllElements();
  }
}
