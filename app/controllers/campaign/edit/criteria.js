import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

import mutation from 'fortnight/gql/mutations/campaign/set-criteria';

export default Controller.extend({
  actions: {
    update() {
      console.info('update!', this.get('model'));
    },
  },

  // startMax: computed.reads('model.criteria.end'),
  // startMin: moment().startOf('day'),
  // endMin: computed.reads('model.criteria.start'),
  // endMax: null,

  // isSaving: false,
  // hasSaved: false,
  // saveMessage: computed('isSaving', 'hasSaved', function() {
  //   const { isSaving, hasSaved } = this.getProperties(['isSaving', 'hasSaved']);
  //   if (isSaving) return 'Your changes are being saved.';
  //   if (hasSaved) return 'Your changes have been saved.';
  //   return 'Changes made on this tab are saved automatically.';
  // }),

});
