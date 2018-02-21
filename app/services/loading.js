import Service from '@ember/service';
import $ from 'jquery';

const target = '#loading-trigger';

export default Service.extend({
  show() {
    $(target).show();
  },
  hide() {
    window.setTimeout(() => $(target).hide(), 250);
  },
});
