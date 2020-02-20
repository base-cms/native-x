import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({

  impressionSummaryTimeSeries: null,
  ctrSummaryTimeSeries: null,

  impressions: computed.reads('model.views'),
  clicks: computed.reads('model.clicks'),
  ctr: computed('impressions', 'clicks', function() {
    return ((this.get('clicks') / this.get('impressions')) * 100).toFixed(2);
  }),

  impressionSummary: computed('impressionSummaryTimeSeries', function() {
    const data = this.get('impressionSummaryTimeSeries');
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
    const data = this.get('ctrSummaryTimeSeries');
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
