import Service from '@ember/service';
import moment from 'moment';

export default Service.extend({
  /**
   * Converts a date (moment, timestamp, or Date) into that date's current day.
   * Removes/zeroes time values, but preserves the year/month/date as provided.
   * Will clone the date into a new moment object.
   * If the moment object is invalid, a null value will be returned.
   *
   * @param {(monent|number|Date)} date
   * @return {moment|null}
   */
  convertToDay(date) {
    const day = moment(date).hours(0).minutes(0).seconds(0).milliseconds(0);
    return day.isValid() ? day : null;
  },

  /**
   * Creates a new moment date object.
   *
   * @param {*} value
   */
  create(value) {
    return moment(value);
  },

  /**
   * Gets the moment object for today's date.
   * Returns the value with only year/month/date values and zeroed time values.
   *
   * @return {moment}
   */
  getToday() {
    return moment().hours(0).minutes(0).seconds(0).milliseconds(0);
  },
});
