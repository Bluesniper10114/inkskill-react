import { combineReducers } from 'redux';
import data from './data';
import reviews from './reviews';
import followers from './followers';

export default combineReducers({
  data,
  reviews,
  followers,
});
