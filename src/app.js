import Tracker from './tracker';

let tracker;
export default function app(command, options) {
  if (command === 'init') {
    if (!tracker) tracker = new Tracker(options);
  } else {
    if (!tracker) throw new Error('No Fortnight instance has been initialized.');
    tracker.execute(command, options);
  }
}
