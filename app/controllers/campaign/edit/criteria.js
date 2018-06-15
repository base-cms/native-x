import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject } from '@ember/service';
import { isPresent } from '@ember/utils';
import ActionMixin from 'fortnight/mixins/action-mixin';
import moment from 'moment';

import mutation from 'fortnight/gql/mutations/campaign/criteria';

export default Controller.extend(ActionMixin, {
  apollo: inject(),

  startMax: computed.reads('model.criteria.end'),
  startMin: moment().startOf('day'),
  endMin: computed.reads('model.criteria.start'),
  endMax: null,

  actions: {
    async update() {
      this.startAction();
      const model = this.get('model');
      const { id, criteria } = model;
      const { start, end, kvs, placements } = criteria;

      // Clone custom variables.
      const keyValues = kvs.map(({ key, value }) => ({ key, value }));
      // Map placements to ids.
      const placementIds = placements.map(p => p.id);
      // Format dates.
      const startDate = moment(start).format('x');
      const endDate = isPresent(end) ? moment(end).format('x') : null;

      const payload = { start: startDate, end: endDate, placementIds, kvs: keyValues };
      const variables = { input: { campaignId: id, payload } };
      try {
        await this.get('apollo').mutate({ mutation, variables }, 'campaignCriteria')
      } catch (e) {
        this.get('graphErrors').show(e);
      } finally {
        this.endAction();
      }
    },
  },
});
