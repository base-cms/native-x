import Ember from 'ember';
import attr  from 'ember-data/attr';

const { Mixin } = Ember;

export default Mixin.create({
  createdDate: attr('moment'),
  touchedDate: attr('moment'),
  updatedDate: attr('moment'),
});
