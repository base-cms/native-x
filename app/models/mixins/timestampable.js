import attr  from 'ember-data/attr';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  createdDate: attr('moment'),
  touchedDate: attr('moment'),
  updatedDate: attr('moment'),
});
