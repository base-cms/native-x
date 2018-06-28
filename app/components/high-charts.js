import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({

  options: null,
  series: null,

  config: computed('options', 'series', function() {
    const config = this.get('options') || {};
    config.series = this.get('series') || [];
    return config;
  }),

  didInsertElement() {
    const config = this.get('config');
    this.$().highcharts(config);
  }
});
