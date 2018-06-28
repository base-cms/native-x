import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  publisherLogo: computed('model.campaignHash.criteria.placements.[]', function() {
    const placements = this.get('model.campaignHash.criteria.placements');
    return placements.map(p => p.publisher.logo)[0];
  }),

  impressions: computed.reads('model.reportCampaignCreativeBreakdown.views'),
  clicks: computed.reads('model.reportCampaignCreativeBreakdown.clicks'),

  ctr: computed.reads('model.reportCampaignCreativeBreakdown.ctr'),

  impressionSummaryTimeSeries: computed('model.reportCampaignCreativeBreakdown.creatives.@each', function() {
    const creatives = this.get('model.reportCampaignCreativeBreakdown.creatives');
    const series = [];
    creatives.forEach(creative => {
      const type = 'line';
      const name = creative.title + ' - Daily Impressions';
      const data = creative.days.map((d) => {
        return { x: d.date, y: d.views };
      });
      series.push({ type, name, data })
    });
    return series;
  }),

  ctrSummaryTimeSeries: computed('model.reportCampaignCreativeBreakdown.creatives.@each', function() {
    const creatives = this.get('model.reportCampaignCreativeBreakdown.creatives');
    const series = [];
    creatives.forEach(creative => {
      const type = 'line';
      const name = creative.title + ' - Daily CTR';
      const data = creative.days.map((d) => {
        return { x: d.date, y: d.ctr };
      });
      series.push({ type, name, data });
    });
    return series;
  }),

  impressionSummary: computed('impressionSummaryTimeSeries', function() {
    const series = this.get('impressionSummaryTimeSeries');
    const data = series ;
    const options = {
      title: {
        text: 'Campaign Creative Breakdown',
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
    const data = series;
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
