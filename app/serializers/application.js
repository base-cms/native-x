import { camelize } from '@ember/string';
import JSONAPISerializer from 'ember-data/serializers/json-api';

export default JSONAPISerializer.extend({
  keyForAttribute(attr) {
    return camelize(attr);
  },
  keyForLink(attr) {
    return camelize(attr);
  },
  keyForRelationship(attr) {
    return camelize(attr);
  },
  payloadKeyFromModelName(modelName) {
    return modelName;
  },
});
