import Service from '@ember/service';
import { inject } from '@ember/service';
import { isPresent } from '@ember/utils';

export default Service.extend({
  notify: inject(),

  handle(e) {
    console.error(e); // eslint-disable-line no-console
    if (isPresent(e.errors) && isPresent(e.errors[0]) && isPresent(e.errors[0].message)) {
      return new Error(e.errors[0].message);
    }
    if (isPresent(e.message)) {
      return e;
    }
    return new Error('Some error happen.');
  },

  show(e) {
    const error = this.handle(e);
    this.get('notify').error(error.message);
  }
});
