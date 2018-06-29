import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({

  impressions: computed.reads('model.views'),
  clicks: computed.reads('model.clicks'),

  ctr: computed('impressions', 'clicks', function() {
    return ((this.get('clicks') / this.get('impressions')) * 100).toFixed(2);
  }),

  dayData: computed.reads('model.days.[]'),

  impressionSummaryTimeSeries: computed('dayData.[]', function() {
    const type = 'line';
    const name = 'Daily Impressions';
    const data = this.get('dayData').map((d) => {
      return { x: d.date, y: d.views };
    });
    return { type, name, data };
  }),

  ctrSummaryTimeSeries: computed('dayData.[]', function() {
    const type = 'line';
    const name = 'Daily CTR';
    const data = this.get('dayData').map((d) => {
      return { x: d.date, y: d.ctr };
    });
    return { type, name, data };
  }),

  impressionSummary: computed('impressionSummaryTimeSeries', function() {
    const series = this.get('impressionSummaryTimeSeries');
    const data = [ series ];
    const options = {
      title: {
        text: false,
      },
      yAxis: {
        title: {
          text: false,
        }
      },
      xAxis: {
        type: 'datetime',
      }
    }
    return { data, options };
  }),

  ctrSummary: computed('impressionSummaryTimeSeries', function() {
    const series = this.get('ctrSummaryTimeSeries');
    const data = [ series ];
    const options = {
      title: {
        text: false,
      },
      yAxis: {
        title: {
          text: false,
        }
      },
      xAxis: {
        type: 'datetime',
      }
    }
    return { data, options };
  }),

});
