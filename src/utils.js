
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
  const fn = () => {
    if (!wasCalled) {
      wasCalled = true;
      callback();
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
  return Object.keys(obj).map((k) => {
    const v = obj[k] || '';
    return `${encodeURIComponent(k)}=${encodeURIComponent(v)}`;
  }).join('&');
}
