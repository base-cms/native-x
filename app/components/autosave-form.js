import Component from '@ember/component';
import { set } from '@ember/object';
import { debounce } from '@ember/runloop';

export default Component.extend({

  onUpdate: null,
  model: null,

  actions: {
    setAndUpdate(field, newVal) {
      const model = this.get('model');
      set(model, field, newVal);
      this.send('update');
    },
    update() {
      debounce(this, 'onUpdate', 750);
    },
  },
})
