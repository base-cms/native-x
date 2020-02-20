import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import ActionMixin from 'fortnight/mixins/action';

import createAdvertiser from 'fortnight/gql/mutations/advertiser/create';

export default Component.extend(ActionMixin, ComponentQueryManager, {
  tagName: '',
  model: null,

  actions: {
    /**
     *
     * @param {object} fields
     */
    async create() {
      this.startAction();
      const { name } = this.get('model');
      const payload = { name };
      const variables = { input: { payload } };
      try {
        const response = await this.get('apollo').mutate({ mutation: createAdvertiser, variables }, 'createAdvertiser');
        await this.sendEventAction('on-success', response);
      } catch (e) {
        this.sendEventAction('on-error', e);
      } finally {
        this.endAction();
      }
    },

    setFieldValue({ name, value }) {
      this.set(`model.${name}`, value);
    },
  },
});
