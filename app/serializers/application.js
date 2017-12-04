import Ember from 'ember';
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return Ember.String.camelize(attr);
  },
  keyForLink(attr) {
    return Ember.String.camelize(attr);
  },
  keyForRelationship(attr) {
    return Ember.String.camelize(attr);
  },
  payloadKeyFromModelName(modelName) {
    return modelName;
  },
});
