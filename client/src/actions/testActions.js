import { FETCH_DATA } from './types';
import axios from 'axios';

// default function to display redux action format
export const testFunc = () => dispatch => {
  axios.get('/api')
    .then(res => {
      dispatch({
        type: FETCH_DATA,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
    })
}