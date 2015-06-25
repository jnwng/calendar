import {NEXT_MONTH, LAST_MONTH} from '../constants/ActionTypes';

export function goToNextMonth() {
  return {
    type: NEXT_MONTH
  };
}

export function goToLastMonth() {
  return {
    type: LAST_MONTH
  };
}
