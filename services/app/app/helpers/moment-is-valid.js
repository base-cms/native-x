import { helper } from '@ember/component/helper';
import moment from 'moment';

export function isValid(params) {
  return moment(params[0]).isValid();
}

export default helper(isValid);
