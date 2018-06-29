import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ImpressionDataMixin from 'fortnight/mixins/impression-data-mixin';

export default Controller.extend(ImpressionDataMixin, {

  impressionSummaryTimeSeries: computed('model.creatives.@each', function() {
    return this.get('model.creatives').map(item => {
      const type = 'line';
      const name = item.creative.title;
      const data = item.days.map((d) => {
        return { x: d.date, y: d.views };
      });
      return { type, name, data };
    });
  }),

  ctrSummaryTimeSeries: computed('model.creatives.@each', function() {
    return this.get('model.creatives').map(item => {
      const type = 'line';
      const name = item.creative.title;
      const data = item.days.map((d) => {
        return { x: d.date, y: d.ctr };
      });
      return { type, name, data };
    });
  }),

});
