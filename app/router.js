import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('manage', { path: '' }, function() {
    this.route('advertiser', function() {
      this.route('create');
      this.route('edit', { path: ':id' });
    });

    this.route('campaign', function() {
      this.route('create');
      this.route('edit', { path: ':id' }, function() {
        this.route('criteria');
        this.route('creatives', function() {
          this.route('create', function() {
            this.route('image');
          });
          this.route('edit', { path: ':creative_id' }, function() {
            this.route('image');
          });
        });
        this.route('notifications');
      });
    });

    this.route('placement', function() {
      this.route('create');
      this.route('edit', { path: ':id' });
    });

    this.route('contact', function() {
      this.route('create');
      this.route('edit', { path: ':id' });
    });

    this.route('publisher', function() {
      this.route('create');
      this.route('edit', { path: ':id' }, function() {
        this.route('topics', function() {
          this.route('create');
          this.route('edit', { path: ':topic_id' });
        });
        this.route('placements', function() {
          this.route('create');
          this.route('edit', { path: ':placement_id' });
        });
      });
    });

    this.route('story', function() {
      this.route('create');
      this.route('edit', { path: ':id' }, function() {
        this.route('primary-image');
      });
    });

    this.route('template', function() {
      this.route('create');
      this.route('edit', { path: ':id' });
    });

    this.route('topic', function() {
      this.route('create');
      this.route('edit', { path: ':id' }, function() {
        this.route('placements', function() {
          this.route('create');
          this.route('edit', { path: ':placement_id' });
        });
      });
    });

    this.route('user', function() {
      this.route('create');
      this.route('edit', { path: ':id' });
    });

  });

  this.route('portal', { path: ':hash' }, function() {
    this.route('campaigns', function() {
      this.route('manage', { path: ':campaign_hash' }, function() {
        this.route('materials', function() {
          this.route('creatives', function() {
            this.route('create', function() {
              this.route('image');
            });
            this.route('edit', { path: ':creative_id' }, function() {
              this.route('image');
              this.route('preview');
            });
          });
        });
        this.route('report', function() {
          this.route('summary');
          this.route('creative-breakdown');
        });
      });
    });
  });

  this.route('login');
  this.route('logout');
});

export default Router;
