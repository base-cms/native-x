import Component from '@ember/component';
import { isEmpty } from '@ember/utils';

export default Component.extend({
  tagName: 'input',
  type: 'file',
  attributeBindings: [
    'name',
    'disabled',
    'form',
    'type',
    'accept',
    'autofocus',
    'required',
    'multiple',
  ],
  multiple: false,

  change(event) {
    const input = event.target;
    if (!isEmpty(input.files)) {
      this.get('on-files-changed')(input.files);
    }
  }
});
