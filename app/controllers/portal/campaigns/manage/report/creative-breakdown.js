import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ImpressionDataMixin from 'fortnight/mixins/impression-data-mixin';
import moment from 'moment';

export default Controller.extend(ImpressionDataMixin, {

  startDate: computed('model.criteria.start', function() {
    const start = this.get('model.criteria.start');
    if (start) return moment(start);
    return moment().subtract(14, 'days');
  }),

  endDate: computed('model.criteria.end', function() {
    const end = this.get('model.criteria.end');
    const now = moment();
    return end > now ? now : moment(end);
  }),

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
