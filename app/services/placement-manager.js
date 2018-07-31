import Service from '@ember/service';
import { get } from '@ember/object';
import ObjectQueryManager from 'ember-apollo-client/mixins/object-query-manager';

import updatePlacement from 'fortnight/gql/mutations/update-placement';
import createPlacement from 'fortnight/gql/mutations/create-placement';
import deletePlacement from 'fortnight/gql/mutations/placement/delete';

export default Service.extend(ObjectQueryManager, {
  /**
   *
   * @param {object} payload The placement payload
   * @param {?object} opts Additional mutation options.
   * @returns {Promise}
   */
  create(payload, opts) {
    const input = {
      payload: this.createPayloadFrom(payload),
    };
    const variables = { input };
    return this.get('apollo').mutate({
      ...opts,
      mutation: createPlacement,
      variables,
    }, 'createPlacement');
  },

  /**
   *
   * @param {string} id The placement ID.
   * @param {object} payload The placement payload.
   * @param {?object} opts Additional mutation options.
   * @returns {Promise}
   */
  update(id, payload, opts) {
    const input = {
      id,
      payload: this.createPayloadFrom(payload),
    };
    const variables = { input };
    return this.get('apollo').mutate({
      ...opts,
      mutation: updatePlacement,
      variables,
    }, 'updatePlacement');
  },

  /**
   *
   * @param {string} id The placement ID.
   * @param {?object} opts Additional mutation options.
   * @returns {Promise}
   */
  delete(id, opts) {
    const input = { id };
    const variables = { input };
    return this.get('apollo').mutate({
      ...opts,
      mutation: deletePlacement,
      variables,
    }, 'deletePlacement');
  },

  /**
   * @param {object} payload
   * @returns {object}
   */
  createPayloadFrom({
    name,
    publisher,
    template,
    topic,
    reservePct,
  } = {}) {
    return {
      name,
      publisherId: get(publisher || {}, 'id'),
      templateId: get(template || {}, 'id'),
      topicId: get(topic || {}, 'id'),
      reservePct: reservePct || 0,
    };
  },
});
