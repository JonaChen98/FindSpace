import { combineReducers } from 'redux';
import postReducer from './postReducer';

import testReducer from './testReducer';


const rootReducers = combineReducers({
  posts: postReducer,
  test: testReducer
});

export default rootReducers;