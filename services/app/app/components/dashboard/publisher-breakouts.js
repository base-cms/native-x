import Component from '@ember/component';
import ComponentQueryManager from 'ember-apollo-client/mixins/component-query-manager';
import { computed, observer } from '@ember/object';
import moment from 'moment';

import publisherMetricBreakouts from 'fortnight/gql/queries/dashboard/publisher-breakouts';
import topicMetricBreakouts from 'fortnight/gql/queries/dashboard/topic-breakouts';

export default Component.extend(ComponentQueryManager, {
  classNames: ['card', 'border-0', 'z-depth-half'],

  sortBy: 'publisherName',
  ascending: true,

  /**
   * The currently selected breakout.
   *
   * @type {string}
   */
  breakout: 'publisher',

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
   * Whether data for the table is being loaded.
   *
   * @type {boolean}
   */
  isLoading: false,

  rowsChanged: computed('rows.[]', function() {
    return true;
  }),

  refreshReport: observer('sortBy', 'ascending', function() {
    this.query();
  }),

  init() {
    this._super(...arguments);

    // Set initial dates.
    const now = moment().startOf('day');
    this.set('endDate', now);
    this.set('startDate', moment(now).subtract(14, 'days'));
  },

  didInsertElement() {
    this.query();
  },

  async query() {
    this.set('isLoading', true);

    const input = {
      startDay: this.get('startDate').valueOf(),
      endDay: this.get('endDate').valueOf(),
    };

    const sort = {
      field: this.get('sortBy'),
      order: this.get('ascending') ? 1 : -1,
    };

    let query;
    let resultKey;
    const breakout = this.get('breakout');
    if (breakout === 'publisher') {
      query = publisherMetricBreakouts;
      resultKey = 'publisherMetricBreakouts';
    } else if (breakout === 'topic') {
      query = topicMetricBreakouts;
      resultKey = 'topicMetricBreakouts';
    }

    const variables = { input, sort };
    try {
      const rows = await this.get('apollo').watchQuery({ query, variables, fetchPolicy: 'network-only' }, resultKey);
      this.set('rows', rows);
    } catch (e) {
      this.get('graphErrors').show(e);
    } finally {
      this.set('isLoading', false);
    }
  },

  actions: {
    setDates({ start, end }) {
      this.set('startDate', moment(start).startOf('day'));
      this.set('endDate', moment(end).startOf('day'));
      this.query();
    },
    setBreakout(breakout) {
      this.set('breakout', breakout);
      this.query();
    },
  },
});
