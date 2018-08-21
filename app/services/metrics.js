import Service from '@ember/service';
import EmberObject from '@ember/object';

const campaignMetrics = EmberObject.extend({
  init() {
    this.set('array', [
      { key: 'views', label: 'Impressions', tooltipFormat: '0,0', labelFormat: '0.[0]a' },
      { key: 'clicks', label: 'Clicks', tooltipFormat: '0,0', labelFormat: '0.[0]a' },
      { key: 'ctr', label: 'CTR', tooltipFormat: '0.[000]%', labelFormat: '0.[000]%' },
    ]);
    this.get('array').forEach((metric) => {
      this.set(metric.key, metric);
    });
  },
});

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('campaign', campaignMetrics.create());
  },
});
