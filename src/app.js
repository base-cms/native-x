import Tracker from './tracker';

let tracker;
export default function app(command, ...args) {
  if (command === 'init') {
    if (!tracker) tracker = new Tracker(...args);
  } else if (command === 'destroy') {
    if (tracker) {
      tracker.destroy();
      tracker = undefined;
    }
  } else {
    if (!tracker) throw new Error('No Fortnight instance has been initialized.');
    tracker.execute(command, ...args);
  }
}
