import { FETCH_DATA } from '../actions/types';

const initialState = {
  test: ''
}

export default (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA:
      return {
        ...state,
        test: action.payload
      };
    default:
      return state;
  }
}