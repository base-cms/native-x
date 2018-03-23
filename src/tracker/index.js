import { assign } from '../utils';
import LinkListener from './link-listener';
import EventTransport from './event-transport';

const listeners = [];

export default class Tracker {
  /**
   * Constructor.
   *
   * @param {?object} options
   * @param {boolean} [options.trackLinks=true] Whether to track links.
   */
  constructor(options = {}) {
    const defaults = {
      trackLinks: true,
      onLinkTrack: undefined,
    };
    const opts = assign(defaults, options);
    this.options = opts;

    const transport = new EventTransport({ domain: opts.domain });
    this.commands = {
      event: transport.send.bind(transport),
    };
    listeners.push(new LinkListener(this, {
      enabled: opts.trackLinks,
      callback: opts.onLinkTrack,
    }));
  }

  /**
   * Executes a command on the tracker.
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
   * The tracker instance is being destroyed.
   * Destroy all event listeners.
   */
  destroy() { // eslint-disable-line class-methods-use-this
    listeners.forEach(listener => listener.destroy());
  }
}
