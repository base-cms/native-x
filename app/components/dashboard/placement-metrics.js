import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { getObservable } from 'ember-apollo-client';

import query from 'fortnight/gql/queries/placement/dashboard';

export default Component.extend(ComponentQueryManager, {
  classNames: ['card', 'border-0', 'z-depth-half'],
  start: null,
  end: null,

  isLoading: true,

  didInsertElement() {
    this.loadData();
  },

  async loadData() {
    this.set('isLoading', true);

    const pagination = { first: 25 };
    const sort = { field: 'createdAt', order: -1 };
    const variables = {
      pagination,
      sort,
      metricsStartDate: this.get('start').valueOf(),
      metricsEndDate: this.get('end').valueOf(),
    };

    try {
      const data = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'allPlacements');
      this.set('observable', getObservable(data));
      this.set('data', data);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.set('isLoading', false);
    }
  },
});
