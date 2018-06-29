import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  publisherLogo: computed('campaign.criteria.placements.[]', function() {
    const placements = this.get('campaign.criteria.placements');
    return placements.map(p => p.publisher.logo)[0];
  }),

  impressions: computed.reads('model.views'),
  clicks: computed.reads('model.clicks'),
  ctr: computed.reads('model.ctr'),

  impressionSummaryTimeSeries: computed('model.creatives.@each', function() {
    const items = this.get('model.creatives');
    const series = [];
    items.forEach(item => {
      const type = 'line';
      const name = item.creative.title;
      const data = item.days.map((d) => {
        return { x: d.date, y: d.views };
      });
      series.push({ type, name, data })
    });
    return series;
  }),

  ctrSummaryTimeSeries: computed('model.creatives.@each', function() {
    const items = this.get('model.creatives');
    const series = [];
    items.forEach(item => {
      const type = 'line';
      const name = item.creative.title;
      const data = item.days.map((d) => {
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
    const data = series;
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
