import { assign } from '../utils';
import LinkListener from './link-listener';
import EventTransport from './event-transport';

const listeners = [];

export default class Tracker {
  constructor(options = {}) {
    const defaults = {
      trackLinks: true,
    };
    const opts = assign(defaults, options);
    this.options = opts;

    const transport = new EventTransport({ domain: opts.domain });

    this.commands = {
      event: transport.send,
    };

    listeners.push(new LinkListener(this, { enabled: opts.trackLinks }));
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
}
