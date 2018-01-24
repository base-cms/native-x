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
   *  @deprecated
   */
  accounts: [],

  /**
   * @deprecated
   */
  tenants: [],

  /**
   * The user id. Will be `null` if the there is not authenticated user.
   *
   * @type {?string}
   */
  uid: computed.reads('auth.uid'),

  /**
   * The active user tenant id.
   *
   *  @deprecated
   * @type {?string}
   */
  tid: null,

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
   *  @deprecated
   * @type {boolean}
   */
  hasTenants: false,

  /**
   * Determines if the user is authenticated, based on the session.
   * Does not check whether a user model is present, or if the session is verified.
   *
   * @type {boolean}
   */
  isAuthenticated: computed.reads('session.isAuthenticated'),

  /**
   * Determines the user's active organization.
   *  @deprecated
   * @type {DS.Model}
   */
  tenant: null,

  load() {
    return new Promise((resolve, reject) => {
      const userId = this.get('session.data.authenticated.id');
      if (isEmpty(userId)) return resolve();

      return this.get('apollo').watchQuery({ query: currentUser }, "currentUser")
        .then(user => this.set('model', user))
        .then(() => resolve())
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

  /**
   * @deprecated
   */
  setActiveTenant(tenantId) {

  }
});
