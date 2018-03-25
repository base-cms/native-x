
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
 * A simplified shim of Object.assign.
 *
 * @param {Object} target
 * @param {...Object} sources
 * @return {Object}
 */
export const assign = Object.assign || function assign(target, ...sources) {
  for (let i = 0, len = sources.length; i < len; i += 1) {
    const source = Object(sources[i]);
    Object.keys(source).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        // eslint-disable-next-line no-param-reassign
        target[key] = source[key];
      }
    });
  }
  return target;
};

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
 * Extracts an event fields object from a node's attribute.
 *
 * @param {DOMNode} node
 * @param {string} attrName
 * @return {object}
 */
export function extractFieldsFrom(node, attrName) {
  const data = node.getAttribute(attrName);
  if (!data) return {};
  try {
    return JSON.parse(decodeURIComponent(data)) || {};
  } catch (e) {
    return {};
  }
}
