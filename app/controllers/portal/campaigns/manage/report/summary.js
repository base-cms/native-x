import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  publisherLogo: computed('model.campaignHash.criteria.placements.[]', function() {
    const placements = this.get('model.campaignHash.criteria.placements');
    return placements.map(p => p.publisher.logo)[0];
  }),

  impressions: computed.reads('model.reportCampaignSummary.views'),
  clicks: computed.reads('model.reportCampaignSummary.clicks'),

  ctr: computed('impressions', 'clicks', function() {
    return ((this.get('clicks') / this.get('impressions')) * 100).toFixed(2);
  }),

  dayData: computed.reads('model.reportCampaignSummary.days.[]'),

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
        text: 'Campaign Summary',
      },
      yAxis: {
        title: {
          text: 'Impressions',
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
        text: 'CTR Summary',
      },
      yAxis: {
        title: {
          text: 'Daily Click-Through Rate',
        }
      },
      xAxis: {
        type: 'datetime',
      }
    }
    return { data, options };
  }),

});
