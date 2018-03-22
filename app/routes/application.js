import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import UpdateAdvertiser from 'fortnight/gql/mutations/update-advertiser';

export default Route.extend(ApplicationRouteMixin, {
  session: inject('session'),
  apollo: inject(),
  errorProcessor: inject(),

  navItems: null,

  beforeModel() {
    return this._loadCurrentUser();
  },

  sessionAuthenticated() {
    this._super(...arguments);
    this._loadCurrentUser().catch((e) => {
      this.get('errorProcessor').show(e);
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

  getGraphQuery(type) {
    switch (type) {
      case 'advertiser':
        return { mutation: UpdateAdvertiser, resultKey: 'updateAdvertiser' };
    }
    throw new Error(`No GraphQL query defined for "${type}"!`);
  },

  actions: {
    linkTo(name) {
      this.transitionTo(name);
    },
    save(record, type) {
      const loader = this.get('loader');
      loader.show();

      const { name } = record;
      const { mutation, resultKey } = this.getGraphQuery(type);
      const variables = { input: { name } };
      // console.warn({ mutation, variables }, resultKey);
      return this.get('apollo').mutate({ mutation, variables }, resultKey)
        .catch(e => this.get('errorProcessor').show(e))
        .finally(() => loader.hide())
      ;
    },
    scrollToTop() {
      // console.info('scrollToTop');
      window.scrollTo(0, 0);
    },
    hardDelete(model, routeName) {
      this.get('notify').warning('Sorry, this item cannot be deleted.');
    },
    softDelete(model, routeName) {
      this.get('notify').warning('Sorry, this item cannot be deleted.');
    },
  }
});
