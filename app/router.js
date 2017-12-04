import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('story', function() {
    this.route('create', { path: '/new' });

    this.route('edit', function() {
      this.route('index', { path: '/:id' });
      this.route('campaign', function() {
        this.route('create', { path: '/:id/new' });
        this.route('edit', { path: '/:id/:cid' });
      })
    })

    this.route('report', function() {
      this.route('index', { path: '/:id' });
      this.route('campaign', { path: '/:id/:cid' });
    });
  });

  this.route('tenant', function() {
    this.route('create', { path: '/new' });
    this.route('index', { path: '/:id' });
    this.route('settings', { path: '/:id/settings' });
  })

  this.route('user', function() {
    this.route('create', { path: '/new' });
    this.route('edit', { path: '/:id/edit' });
  })

  this.route('login');
  this.route('logout');
  this.route('docs');
});

export default Router;
