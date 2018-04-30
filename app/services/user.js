import Service, { inject } from '@ember/service';
import { computed } from '@ember/object';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';

export default Service.extend(ObjectQueryManager, {
  loadingDisplay: inject(),
  session: inject(),
  auth: inject(),

  model: computed.alias('auth.response.user'),

  isAuthenticated: computed.reads('session.isAuthenticated'),

  role: computed('isAuthenticated', 'model.role', function() {
    if (!this.get('isAuthenticated')) return null;
    return this.get('model.role');
  }),

  roleIs(...roles) {
    const role = this.get('role');
    if (!role) return false;
    return roles.includes(role);
  },

  logout() {
    const loader = this.get('loadingDisplay');
    loader.show();
    return this.get('session').invalidate()
      .finally(loader.hide())
    ;
  }
});
