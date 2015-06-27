import {ADD_RANGE} from '../constants/ActionTypes';

const initialState = [{
  id: 1,
  start:'2015-06-20',
  end: '2015-06-30'
}];

export default function dateRanges(state=initialState, action) {
  switch(action.type) {
    case ADD_RANGE:
      return [{
        id: (state.length === 0) ? 0 : state[0].id + 1,
        start: action.start,
        end: action.end
      }, ...state];

    default:
      return state;
  }
}
