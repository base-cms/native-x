import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get, computed } from '@ember/object';
import { all } from 'rsvp';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updateAdvertiser from 'fortnight/gql/mutations/advertiser/update';
import deleteAdvertiser from 'fortnight/gql/mutations/advertiser/delete';
import undeleteAdvertiser from 'fortnight/gql/mutations/advertiser/undelete';
import advertiserLogo from 'fortnight/gql/mutations/advertiser/logo';
import setContacts from 'fortnight/gql/mutations/advertiser/set-contacts';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  isUploading: false,
  isFormDisabled: computed.or('isActionRunning', 'isUploading'),

  actions: {
    /**
     * Sets an image as the advertiser's logo.
     *
     * @param {?object} image
     */
    async setLogo(image) {
      this.startAction();
      const input = {
        id: this.get('model.id'),
        imageId: get(image || {}, 'id'),
      }
      const variables = { input };
      try {
        await this.get('apollo').mutate({ mutation: advertiserLogo, variables }, 'advertiserLogo');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     *
     * @param {object} fields
     */
    async update({ id, name, notify }) {
      this.startAction();
      const promises = [];
      ['internal', 'external'].forEach((type) => {
        const contacts = get(notify, type) || [];
        const contactIds = contacts.map(contact => get(contact, 'id'));
        const variables = { input: { id, type, contactIds } };
        const mutation = setContacts;
        promises.push(this.get('apollo').mutate({ mutation, variables }, 'setAdvertiserContacts'));
      });
      const payload = { name };
      const variables = { input: { id, payload } };
      const mutation = updateAdvertiser;

      try {
        await all(promises);
        await this.get('apollo').mutate({ mutation, variables }, 'updateAdvertiser');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Deletes the advertiser
     *
     */
    async delete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deleteAdvertiser;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deleteAdvertiser');
        return this.transitionToRoute('manage.advertiser.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Restores (undeletes) the advertiser
     *
     */
    async undelete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = undeleteAdvertiser;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'undeleteAdvertiser');
        return this.transitionToRoute('manage.advertiser.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
