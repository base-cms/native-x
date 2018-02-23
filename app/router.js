import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  this.route('advertiser', function() {
    this.route('create', { path: 'new' });
    this.route('edit', { path: ':id' });
  })

  this.route('campaign', function() {
    this.route('create', { path: 'new' }, function() {
      this.route('advertiser', { path: ':id' });
    });
    this.route('edit', { path: ':id' });
  })

  const listableModels = ['user', 'publisher', 'placement', 'schedule'];
  listableModels.forEach(model => {
    this.route(model, function() {
      this.route('create', { path: 'new' });
      this.route('edit', { path: '/:id/edit' });
    })
  })

  this.route('login');
  this.route('logout');
  this.route('reports');
  this.route('about');
});

export default Router;
