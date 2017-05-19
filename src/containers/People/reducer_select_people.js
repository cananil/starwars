
import { SELECT_PEOPLE } from '../../constants';

export default function(state = {}, action) {
  switch (action.type) {
  case SELECT_PEOPLE:
      return action.payload;
  default:
    return state;
  }
}
