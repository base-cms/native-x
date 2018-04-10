import Component from '@ember/component';
import { debounce } from '@ember/runloop';

export default Component.extend({

  onUpdate: null,
  model: null,

  actions: {
    setAndUpdate(field, newVal) {
      const model = this.get('model');
      model.set(field, newVal);
      this.send('update');
    },
    update() {
      debounce(this, 'onUpdate', 750);
    },
  },
})
