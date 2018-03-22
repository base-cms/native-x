import Service from '@ember/service';
import { inject } from '@ember/service';
import { computed } from '@ember/object';
import RSVP from 'rsvp';
import { isEmpty } from '@ember/utils';
import currentUser from 'fortnight/gql/queries/current-user';

const { Promise } = RSVP;

export default Service.extend({
  session: inject(),
  apollo: inject(),
  loader: inject(),

  /**
   * The Ember data user model.
   *
   * @type {DS.Model}
   */
  model: null,

  /**
   *  @deprecated
   */
  accounts: null,

  /**
   * @deprecated
   */
  tenants: null,

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
    return new Promise((resolve) => {
      const userId = this.get('session.data.authenticated.id');
      if (isEmpty(userId)) return resolve();

      return this.get('apollo').watchQuery({ query: currentUser }, "currentUser")
        .then(user => this.set('model', user))
        .then(() => resolve())
      ;
    });
  },

  logout() {
    const loader = this.get('loader');
    loader.show();
    return this.get('session').invalidate()
      .finally(loader.hide())
    ;
  }
});
