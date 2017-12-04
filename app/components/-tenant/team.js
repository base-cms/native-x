import Ember from 'ember';

const { Component, inject: { service }, computed } = Ember;

export default Component.extend({
  classNames: ['container'],
  store: service(),

  members: [],
  invitations: [],

  isLoading: false,
  error: null,

  roles: [
    { value: "Member", label: "Member" },
    { value: "Owner", label: "Owner" },
    { value: "Restricted", label: "Restricted" },
  ],

  newInvitation: null,
  hasNewInvitation: computed.notEmpty('newInvitation'),

  activeInvitation: null,
  hasActiveInvitation: computed.notEmpty('activeInvitation'),

  activeUser: null,
  activeAction: null,
  hasActiveUser: computed.notEmpty('activeUser'),

  isActionRole: computed.equal('activeAction', 'role'),
  isActionReset: computed.equal('activeAction', 'reset'),
  isActionKick: computed.equal('activeAction', 'kick'),

  isChangingRole: computed.and('hasActiveUser', 'isActionRole'),
  isChangingPassword: computed.and('hasActiveUser', 'isActionReset'),
  isKickingUser: computed.and('hasActiveUser', 'isActionKick'),

  actions: {
    createInvitation() {
      const firstName = this.get('user.model.firstName');
      const lastName = this.get('user.model.lastName');
      const invitation = this.get('store').createRecord('tenant/$tid/invitation');
      invitation.set('from', `${firstName} ${lastName}`);
      this.set('newInvitation', invitation);
    },
    sendInvitation() {
      const invitation = this.get('newInvitation');
      const email = invitation.get('email').toLowerCase();
      if (this.get('members').filterBy('email', email).length) {
        this.set('error', { message: `${email} is already a member of this organization.` });
        return;
      }
      if (this.get('invitations').filterBy('email', email).filterBy('isNew', false).length) {
        this.set('error', { message: `${email} has already been invited to this organization.` });
        return;
      }
      this.set('isLoading', true)
      invitation.save()
        .then(() => this.set('newInvitation', null))
        .catch((e) => this.set('error', e))
        .finally(() => this.set('isLoading', false))
      ;
    },
    showCancelInvitation(invitation) {
      this.set('activeInvitation', invitation);
    },
    cancelNewInvitation() {
      this.set('newInvitation', null);
    },
    cancelInvitation() {
      this.get('activeInvitation').destroyRecord()
        .then(() => this.set('activeInvitation', null))
      ;
    },

    setActiveUser(user, action) {
      this.set('activeUser', user);
      this.set('activeAction', action);
    },

    discardActiveUser() {
      this.set('activeUser', null);
      this.set('activeAction', null);
    },

    updateActiveUser() {
      this.set('loading', false);
      this.set('error', null);

      this.get('activeUser').save()
        .then(() => this.send('discardActiveUser'))
        .catch(e => this.set('error', e))
        .finally(() => this.set('isLoading', false))
      ;
    },

    removeActiveUser() {
      this.set('loading', false);
      this.set('error', null);

      this.get('activeUser').destroyRecord()
        .then(() => this.send('discardActiveUser'))
        .catch(e => this.set('error', e))
        .finally(() => this.set('isLoading', false))
      ;
    },

    sendPasswordReset() {
      this.set('isLoading', true);
      const uid = this.get('activeMember.id');
      this.get('store').createRecord('org-writeable-owner/password-reset-queue/$uid/$oid', {uid: uid}).save()
        .then(() => this.set('isLoading', false))
        .then(() => this.set('isResetPasswordModalShown', false))
        .catch((e) => this.set('error', e))
      ;
    },
    changeRole() {
      this.set('isLoading', true);
      const uid = this.get('activeMember.id');
      const role = this.get('changeRoleSelection.value');
      this.get('store').createRecord('org-writeable-owner/change-role-queue/$uid/$oid', {uid: uid, role: role}).save()
        .then(() => this.set('isLoading', false))
        .then(() => this.set('isChangeRoleModalShown', false))
        .catch((e) => this.set('error', e))
      ;
    },
    removeMember() {
      this.set('isLoading', true);
      const uid = this.get('activeMember.id');
      this.get('store').createRecord('org-writeable-owner/remove-member-queue/$uid/$oid', {uid: uid}).save()
        .then(() => this.set('isLoading', false))
        .then(() => this.set('isRemoveMemberModalShown', false))
        .catch((e) => this.set('error', e))
      ;
    },
    toggleResetPasswordModal(member) {
      this.set('activeMember', member);
      this.set('isResetPasswordModalShown', !this.get('isResetPasswordModalShown'));
    },
    toggleChangeRoleModal(member) {
      this.set('activeMember', member);
      this.set('isChangeRoleModalShown', !this.get('isChangeRoleModalShown'));
    },
    toggleRemoveMemberModal(member) {
      this.set('activeMember', member);
      this.set('isRemoveMemberModalShown', !this.get('isRemoveMemberModalShown'));
    },
  },
});
