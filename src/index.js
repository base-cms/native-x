import app from './app';
import legacy from './legacy';

// Execute legacy tracker. Remove once tested.
legacy();

// Find the command queue in the `window` object.
const WINDOW_VAR_NAME = 'FortnightObject';
const queueName = window[WINDOW_VAR_NAME];
if (!queueName || !window[queueName]) {
  throw new Error(`No ${WINDOW_VAR_NAME} object was found or initialized. Was the proper JavaScript included on the page?`);
}
const commandQueue = window[queueName];

// Apply the queue to the app.
const queue = commandQueue.q;
if (Array.isArray(queue)) {
  // Find and send the init commands first, in case the user sent the commands out of order.
  queue.filter(args => args[0] === 'init').forEach(args => app(...args));
  // Send all other commands.
  queue.filter(args => args[0] !== 'init').forEach(args => app(...args));
}

// Replace the queue with the app.
window[queueName] = app;
