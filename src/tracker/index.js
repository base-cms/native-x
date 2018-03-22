import { assign } from '../utils';

const domain = 'https://fortnight.as3.io';

export default class Tracker {
  constructor(options = {}) {
    this.opts = assign({ domain }, options);
    console.info('Tracker initialized.', this.opts);
    this.commands = {};
  }
  execute(command, options = {}) {
    const opts = assign({}, options);
    console.info('execute', command, opts, this.commands[command]);
  }
}
