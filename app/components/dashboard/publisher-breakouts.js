import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { getObservable } from 'ember-apollo-client';
import moment from 'moment';

import query from 'fortnight/gql/queries/publisher/dashboard';


export default Component.extend(ComponentQueryManager, {
  classNames: ['card', 'border-0', 'z-depth-half'],

  /**
   * The chart start date.
   *
   * @type {Date}
   */
  startDate: null,

  /**
   * The chart end date.
   *
   * @type {Date}
   */
  endDate: null,

  /**
   * Whether data for the chart is being loaded.
   *
   * @type {boolean}
   */
  isLoading: false,

  init() {
    this._super(...arguments);

    // Set initial dates.
    const now = moment().startOf('day');
    this.set('endDate', now);
    this.set('startDate', moment(now).subtract(14, 'days'));

    // Set the initial breakouts
    this.set('breakouts', {
      publisher: true,
      placement: false,
      topic: false,
    });
  },

  actions: {
    setDates({ start, end }) {
      this.set('startDate', moment(start).startOf('day'));
      this.set('endDate', moment(end).startOf('day'));
    },
    setBreakout(property, event) {
      const { checked } = event.target;
      this.set(`breakouts.${property}`, checked);
    },
  },


  ////////////////


  didInsertElement() {
    // this.loadData();
  },

  async loadData() {
    this.set('isLoading', true);

    const pagination = { first: 25 };
    const sort = { field: 'name', order: 1 };
    const variables = {
      pagination,
      sort,
      metricsStartDate: this.get('start').valueOf(),
      metricsEndDate: this.get('end').valueOf(),
    };

    try {
      const data = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, 'allPublishers');
      this.set('observable', getObservable(data));
      this.set('data', data);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.set('isLoading', false);
    }
  },
});
