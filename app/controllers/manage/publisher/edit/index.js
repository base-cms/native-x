import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { get, computed } from '@ember/object';
import { isFQDN } from 'validator';
import ActionMixin from 'fortnight/mixins/action-mixin';

import updatePublisher from 'fortnight/gql/mutations/publisher/update';
import publisherLogo from 'fortnight/gql/mutations/publisher/logo';
import deletePublisher from 'fortnight/gql/mutations/publisher/delete';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  isUploading: false,
  isFormDisabled: computed.or('isActionRunning', 'isUploading'),

  actions: {
    /**
     * Validates that the form's domain name is valid.
     * Returning `false` will stop form validation.
     * Setting a field's custom validity will force-fail the form validation.
     *
     * @param {object} instance The `model-form` component instance.
     * @param {HTMLFormElement} form The publisher form element.
     */
    validateDomain(instance, form) {
      const domain = form.elements['publisher-domain-name'];
      if (!domain) return;

      const { value } = domain;
      if (!value) return;

      const isValid = isFQDN(value);
      domain.setCustomValidity(isValid ? '' : 'The provided domain name is invalid.');
    },

    /**
     * Sets an image as the publisher's logo.
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
        await this.get('apollo').mutate({ mutation: publisherLogo, variables }, 'publisherLogo');
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
    async update({ id, name }) {
      this.startAction();
      const payload = { name };
      const variables = { input: { id, payload } };
      try {
        await this.get('apollo').mutate({ mutation: updatePublisher, variables }, 'updatePublisher');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },

    /**
     * Deletes the publisher
     *
     */
    async delete() {
      this.startAction();
      const id = this.get('model.id');
      const variables = { input: { id } };
      const mutation = deletePublisher;
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'deletePublisher');
        await this.transitionToRoute('manage.publisher.index');
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
