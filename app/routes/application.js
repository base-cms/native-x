import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { Route, inject: { service } } = Ember;

export default Route.extend(ApplicationRouteMixin, {
  loading: service(),
  session: service('session'),

  navItems: [],

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch((e) => {
      console.error(e);
      this.get('session').invalidate();
    });
  },

  setupController(controller, model) {
    controller.set('session', this.get('session'));
    this._super(controller, model);
  },

  _loadCurrentUser() {
    return this.user.load();
  },

  actions: {
    linkTo(name) {
      this.transitionTo(name);
    },
    save(record, routeName) {
      const loading = this.get('loading');
      const isNew = record.get('isNew');

      loading.show();
      record.save()
        .then(result => {
          if (isNew) {
            const editRoute = (typeof routeName === 'string') ? `${routeName}.edit` : `${record.constructor.modelName}.edit`;
            this.transitionTo(editRoute, result.get('id'));
          }
        })
        // .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors))
        .finally(() => loading.hide())
      ;
    },
    scrollToTop() {
      console.info('scrollToTop');
      window.scrollTo(0, 0);
    },
    hardDelete(model, routeName) {
      const loading = this.get('loading');

      // @todo Should use a more elegant confirmation.
      if (window.confirm('Are you sure you want to delete this item? It will be permanently removed.')) {
        loading.show();
        model.destroyRecord()
          .then(() => this.transitionTo(routeName))
          // .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors))
          .finally(() => loading.hide())
        ;
      }
    },
    softDelete(model, routeName) {
      const loading = this.get('loading');

      // @todo Should use a more elegant confirmation.
      if (window.confirm('Are you sure you want to delete this item?')) {
        loading.show();
        model.set('deleted', true);
        model.save()
          .then(() => this.transitionTo(routeName))
          // .catch(adapterError => this.get('errorProcessor').notify(adapterError.errors))
          .finally(() => loading.hide())
        ;
      }
    },
  }
});
