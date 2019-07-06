import { combineReducers } from 'redux';
import list from './list';
import featured from './featured';
import popular from './popular';
import info from './info';
import details from './details';

export default combineReducers({
  list,
  featured,
  popular,
  info,
  details,
});
