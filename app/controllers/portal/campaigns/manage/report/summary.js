import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ImpressionDataMixin from 'fortnight/mixins/impression-data-mixin';

export default Controller.extend(ImpressionDataMixin, {

  impressionSummaryTimeSeries: computed('model.days.[]', function() {
    const type = 'line';
    const name = 'Daily Impressions';
    const data = this.get('model.days').map((d) => {
      return { x: d.date, y: d.views };
    });
    return [{ type, name, data }];
  }),

  ctrSummaryTimeSeries: computed('model.days.[]', function() {
    const type = 'line';
    const name = 'Daily CTR';
    const data = this.get('model.days').map((d) => {
      return { x: d.date, y: d.ctr };
    });
    return [{ type, name, data }];
  }),

});
