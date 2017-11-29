const name = 'user';

export function initialize(appInstance) {
  appInstance.inject('controller', name, `service:${name}`);
  appInstance.inject('route', name, `service:${name}`);
  appInstance.inject('component', name, `service:${name}`);
}

export default {
  name,
  initialize
};
