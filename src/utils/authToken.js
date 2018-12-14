import * as jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import axios from 'axios';

import store from '../store';
import { SET_CURRENT_USER } from '../actions/types';

// Checking Auth Token if Exists in Cookies
export const checkAuthToken = () => {
  const cookies = new Cookies();
  const token = cookies.get('Authorization');

  if (token) {
    setAuthToken(token);
    const decodedUser = jwt_decode(token);
    store.dispatch({
      type: SET_CURRENT_USER,
      payload: decodedUser
    });
  }
};

export const setAuthToken = token => {
  if (token) {
    // Applies the token in every request
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};
