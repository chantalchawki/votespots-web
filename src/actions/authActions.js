import Cookies from 'universal-cookie';
import * as jwt_decode from 'jwt-decode';
import axios from 'axios';

import { SET_CURRENT_USER } from './types';
import { setAuthToken } from '../utils/authToken';

export const loginUser = (payload, history) => async dispatch => {
  try {
    const { data } = await axios.post('api/login', payload);
    const { token } = data;

    const cookies = new Cookies();
    cookies.set('Authorization', token);

    const decodedUser = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decodedUser
    });

    history.push('/');
  } catch (error) {
    console.log('An Error occured.', error);
  }
};

export const logoutUser = history => dispatch => {
  const cookies = new Cookies();
  cookies.remove('Authorization');

  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });

  setAuthToken();

  history.push('/');
};
