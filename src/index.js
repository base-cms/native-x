import app from './app';

// Find the command queue in the `window` object.
const WINDOW_VAR_NAME = 'FortnightObject';
const queueName = window[WINDOW_VAR_NAME];
if (!queueName || !window[queueName]) {
  throw new Error(`No ${WINDOW_VAR_NAME} object was found or initialized. Was the proper JavaScript included on the page?`);
}
const commandQueue = window[queueName];

const execute = (stack) => {
  for (let i = 0; i < stack.length; i += 1) {
    const args = stack[i];
    app(...args);
  }
};

// Apply the queue to the app.
const queue = commandQueue.q;
if (Array.isArray(queue)) {
  // Find and send the init command first, in case the user sent the commands out of order.
  const first = [];
  const next = [];
  for (let i = 0; i < queue.length; i += 1) {
    const args = queue[i];
    if (args[0] === 'init') {
      first.push(args);
    } else {
      next.push(args);
    }
  }
  execute(first);
  execute(next);
}

// Replace the queue with the app.
window[queueName] = app;
