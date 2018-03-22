import { assign } from '../utils';

const domain = 'https://fortnight.as3.io';

export default class Tracker {
  constructor(options = {}) {
    this.options = assign({ domain }, options);
    this.commands = {};
  }

  /**
   * Excutes a command on the tracker.
   *
   * @param {string} command
   * @param {...object} args
   */
  execute(command, ...args) {
    if (this.commands[command]) {
      this.commands[command](...args);
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
    return `${this.domain}/${endpoint.replace(/^\/+/)}`;
  }
}
