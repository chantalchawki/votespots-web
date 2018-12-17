import Cookies from 'universal-cookie';
import * as jwt_decode from 'jwt-decode';
import axios from 'axios';
import message from 'antd/lib/message';

import { SET_CURRENT_USER } from './types';
import { setAuthToken } from '../utils/authToken';

export const loginUser = (payload, history) => async dispatch => {
  try {
    const { data } = await axios.post('api/login', payload);
    const { token } = data;

    const cookies = new Cookies();
    cookies.set('Authorization', token);
    setAuthToken(token);
    const decodedUser = jwt_decode(token);
    dispatch({
      type: SET_CURRENT_USER,
      payload: decodedUser
    });

    message.success(`Welcome back, ${decodedUser.name}`);
    history.push('/');
  } catch (error) {
    message.error(error.response.data.message || 'An Error Occured.');
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

  message.success('Au revoir 👋🏻');
  history.push('/');
};
