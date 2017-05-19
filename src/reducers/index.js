import { combineReducers } from 'redux';

import PeopleReducer from '../containers/People/reducer_fetch_people';
import ActivePeople from '../containers/People/reducer_select_people';

const rootReducer = combineReducers({
  people: PeopleReducer,
  activePeople: ActivePeople
});

export default rootReducer;
