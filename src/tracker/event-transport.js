import { assign } from '../utils';

const domain = 'https://fortnight.as3.io';

export default class EventTransport {
  constructor(options = {}) {
    const defaults = { domain };
    this.options = assign(defaults, options);
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
    return `${this.domain}/${endpoint.replace(/^\/+/)}`;
  }
}
