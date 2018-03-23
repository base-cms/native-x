import { assign, buildQuery } from '../utils';

const domain = 'https://fortnight.as3.io';

export default class EventTransport {
  /**
   * Constructor.
   *
   * @param {?object} options
   * @param {?string} options.domain The backend domain.
   */
  constructor(options = {}) {
    const defaults = { domain };
    this.options = assign(defaults, options);
  }

  /**
   * Sends an event to the backend.
   *
   * @param {string} action The event action, e.g. `view`, `load` or `click`
   * @param {object} fields The event fields
   * @param {string} fields.pid The placement ID
   * @param {string} fields.cid The campaign ID
   * @param {?object} options The event options
   * @param {?string} options.transport The transport type. Image is the default.
   * @param {?Function} options.callback The callback to fire once complete.
   */
  send(
    action,
    { pid, cid } = {},
    { transport, callback } = {},
  ) {
    const act = String(action).trim().toLowerCase();
    if (!act) return;
    const _ = (new Date()).getTime();
    const query = buildQuery({ pid, cid, _ });
    const endpoint = `/e/${act}.gif?${query}`;
    const url = this.createUrl(endpoint);

    if (transport === 'beacon') {
      this.sendBeacon(url, callback);
    } else {
      this.sendImage(url, callback);
    }
  }

  /**
   * Fires an event using an `img` element.
   *
   * @private
   * @param {string} url
   * @param {Function} cb
   */
  sendImage(url, cb) {
    const img = document.createElement('img');
    if (typeof cb === 'function') {
      img.onload = () => cb(url);
      img.onerror = () => cb(url);
    }
    img.src = this.createUrl(url);
  }

  /**
   * Fires an event using the Beacon API.
   *
   * @private
   * @param {string} url
   * @param {Function} cb
   */
  sendBeacon(url, cb) {
    if (!navigator.sendBeacon) {
      this.sendImage(url, cb);
    } else {
      if (typeof cb === 'function') cb(url);
      navigator.sendBeacon(url);
    }
  }

  /**
   * Configures the domain name for sending events.
   *
   * @return string
   */
  get domain() {
    if (!this.options.domain) return '';
    return `${this.options.domain.replace(/\/+$/, '')}`;
  }

  /**
   * Creates a URL using the provided endoint with the configured domain.
   *
   * @param {string} endpoint
   * @return {string}
   */
  createUrl(endpoint) {
    return `${this.domain}/${endpoint.replace(/^\/+/, '')}`;
  }
}
