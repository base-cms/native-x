import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('story', function() {
    this.route('new');
    this.route('edit', { path: '/story/:id' });
    this.route('report', { path: '/story/:id/report' }, function() {
      this.route('campaign', { path: '/story/:id/report/:campaignId' });
    });
  });

  this.route('tenant-create');

  this.route('tenant', function() {
    this.route('index', { path: '/tenant/:id' });
    this.route('edit', { path: '/tenant/:id/edit' });
  })

  this.route('login');
  this.route('docs');
});

export default Router;
