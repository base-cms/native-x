import Route from '@ember/routing/route';

export default Route.extend({
  model({ campaign_hash }) {
    console.info('campaign_hash', campaign_hash);
  }
});

