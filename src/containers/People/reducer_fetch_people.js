//import { Record } from 'immutable';
import _ from 'lodash';
import { FETCH_PEOPLE } from '../../constants';

export default function(state = {}, action) {
  switch (action.type) {
  case FETCH_PEOPLE:
    //return _.mapKeys(action.payload.data,'mass');
      return action.payload.data;
  default:
    return state;
  }
}
