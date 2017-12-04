import Transform from 'ember-data/transform';
import moment from 'moment';

export default Transform.extend({
  deserialize(serialized) {
    const type = typeof serialized;

    if (type === "string") {
      // Will work properly with ISO8601 (which we use by default).
      // However, @todo, we may want to support passing a specific format with the transform
      // to support moment(String, Format)
      return moment(serialized);
    } else if (type === "number") {
      // Assumes a UNIX timestamp with milliseconds, e.g. 1318781876406
      // @todo Could also pass this as an option as well.
      return moment(serialized);
    } else if (serialized === null || serialized === undefined) {
      // if the value is null return null
      // if the value is not present in the data return undefined
      return serialized;
    } else {
      return null;
    }
  },

  serialize(date) {
    if (date instanceof moment && !isNaN(date)) {
      return date.toISOString();
    } else {
      return null;
    }
  }
});
