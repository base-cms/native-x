import Service from '@ember/service';
import Ember from 'ember';
import currentUser from 'fortnight/gql/queries/current-user';

const { computed, inject: { service }, RSVP, get, isEmpty } = Ember;
const { Promise } = RSVP;

export default Service.extend({
  store: service(),
  session: service(),
  apollo: service(),
  loading: service(),
  query: service('model-query'),

  /**
   * The Ember data user model.
   *
   * @type {DS.Model}
   */
  model: {},

  /**
   * Organizations that this user is a user of.
   *
   * @type {DS.Model[]}
   */
  accounts: computed.reads('model.accounts'),

  /**
   * @deprecated
   */
  tenants: computed.reads('accounts'),

  /**
   * The user id. Will be `null` if the there is not authenticated user.
   *
   * @type {?string}
   */
  uid: computed.reads('auth.uid'),

  /**
   * The active user tenant id.
   *
   * @type {?string}
   */
  tid: computed.reads('tenant.id'),

  /**
   * The Firebase Auth object, or `null` if not authenticated.
   *
   * @type {?object}
   */
  auth: computed('isAuthenticated', 'session.currentUser.@each', function() {
    if (!this.get('isAuthenticated')) {
      return;
    }
    return this.get('session.currentUser');
  }),

  /**
   * Determines if the user has any organizations.
   * @type {boolean}
   */
  hasTenants: computed.bool('tenants.length'),

  /**
   * Determines if the user is authenticated, based on the session.
   * Does not check whether a user model is present, or if the session is verified.
   *
   * @type {boolean}
   */
  isAuthenticated: computed.reads('session.isAuthenticated'),

  /**
   * Determines the user's active organization.
   *
   * @type {DS.Model}
   */
  tenant: computed('tenants.firstObject', 'model.activeAccount', function() {
    const defaultAccount = this.get('tenants.firstObject');
    const activeAccount = this.get('model.activeAccount');
    return activeAccount || defaultAccount;
  }),

  load() {
    return new Promise((resolve, reject) => {
      const userId = this.get('session.data.authenticated.id');
      if (isEmpty(userId)) return resolve();

      // @todo Should this just store the user in the session data via `currentUser` or `loginUser` queries?
      return this.get('apollo').watchQuery({ query: currentUser }, "currentUser")
      .then(user => {
        this.set('model', user);
        resolve();
      })
      ;
    });
  },

  logout() {
    const loading = this.get('loading');
    loading.show();
    return this.get('session').invalidate()
      .finally(loading.hide())
    ;
  },

  setActiveTenant(tenantId) {
    this.set('model.activeTenantId', tenantId);
    return this.get('model').save();
  }
});
