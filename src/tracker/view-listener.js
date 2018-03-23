import { domReady } from '../utils';

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
  constructor(tracker) {
    // Disable if the browser does not support the required features.
    if (!(window.IntersectionObserver && window.MutationObserver)) return;

    this.handleIntersection = this.handleIntersection.bind(this);

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

  handleIntersection(records) {
    const toRemove = [];
    for (let i = 0; i < records.length; i += 1) {
      const record = records[i];
      if (isVisible(0.25, record)) {
        const { id } = record.target;
        this.sendEvent(id);
        toRemove.push(id);
      }
    }
  }

  sendEvent(id) {
    const element = document.getElementById(id);
    this.tracker.execute('event', 'view', { id: element.id }, { transport: 'beacon' });
  }

  observeElements() {
    const ids = ViewListener.getElementIds();

    const observer = new IntersectionObserver(this.handleIntersection, {
      rootMargin: '0px',
      threshold: 0.25,
    });

    ids.forEach((id) => {
      const element = this.elementMap[id] || document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });
  }

  destroy() {
    this.unobserveAllElements();
  }
}
