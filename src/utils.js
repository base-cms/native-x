
/**
 * Returns a wrapped version of the provided function.
 * If it's not called when the timeout is reached, it will be called regardless.
 * The wrapped function will also be prevented from being called more than once.
 *
 * @param {Function} callback
 * @param {number} wait
 * @return {Function}
 */
export function withTimeout(callback, wait = 2000) {
  let wasCalled = false;
  const fn = (...args) => {
    if (!wasCalled) {
      wasCalled = true;
      callback(...args);
    }
  };
  setTimeout(fn, wait);
  return fn;
}

/**
 * Builds a simply query string from object.
 *
 * @param {object} obj
 * @return {string}
 */
export function buildQuery(obj) {
  return Object.keys(obj).filter(k => obj[k]).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`).join('&');
}

/**
 * Will invoke the provided function when the DOM is ready.
 * If already ready, the callback will be invoked immediately.
 *
 * @param {Function} callback The ready callback.
 */
export function domReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function fn() {
      document.removeEventListener('DOMContentLoaded', fn);
      callback();
    });
  } else {
    callback();
  }
}

/**
 * Extracts an event fields object from a node.
 *
 * @param {DOMNode} node
 * @param {string} attrName
 * @return {object}
 */
export function extractFieldsFrom(node) {
  if (node.nodeType !== 1) return {};
  const data = node.getAttribute('data-fortnight-fields');
  if (!data) return {};
  try {
    return JSON.parse(decodeURIComponent(data)) || {};
  } catch (e) {
    return {};
  }
}

/**
 * Determines if a node is trackable for the provided action.
 *
 * @param {DOMNode} node
 * @param {string} action
 * @return {boolean}
 */
export function isTrackable(node, action) {
  if (node.nodeType !== 1) return false;
  const value = node.getAttribute('data-fortnight-action');
  return action === value;
}

export function logSupport(test, message, level = 'warning', extra) {
  if (window.Raven && test) {
    window.Raven.captureMessage(message, { level, extra });
  }
}
