import moment from 'moment';
import {NEXT_MONTH, LAST_MONTH} from '../constants/ActionTypes';

export default function currentMonth(month=moment().month(), action) {
  switch (action.type) {
    case NEXT_MONTH:
      return month + 1;
    case LAST_MONTH:
      return month - 1;
    default:
      return month;
  }
}
