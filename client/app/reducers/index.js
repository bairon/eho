import {combineReducers} from 'redux';
import characterSelect from './characterSelect';
import messages from './messages';
import user from './user';

const ehoApp = combineReducers({
  characterSelect,
  messages,
  user
});

export default ehoApp;
