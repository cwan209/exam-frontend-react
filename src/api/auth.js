import * as config from '../config';
import {getAuthToken} from "../helper/authHelper";

export const signup = (email, password, username, roles) => {
  const url = `${config.apiHost}/v1/auth/signup`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        username: username,
        roles: roles
      })
    })
    .then(response => response.json())
    .then(response => {
      return response;
    }).catch(error => {
      console.error(error);
      return {
        success: false,
        error: error
      }
    });
};

export const verifyAccount = (email, verificationToken) => {
  const url = `${config.apiHost}/v1/verify`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        verificationToken: verificationToken,
      })
    })
    .then(response => response.json())
    .then(response => {
      return response;
    }).catch(error => {
      console.error(error);
      return {
        success: false,
        error: error
      }
    });
};

export const login = (email, password, name) => {
  const url = `${config.apiHost}/v1/auth/signin`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(response => response.json())
    .then(response => {
      return response;
    }).catch(error => {
      console.error(error);
      return {
        success: false,
        error: error
      }
    });
};

export const getCurrentUser = () => {
  const url = `${config.apiHost}/v1/auth/me`;

  return fetch(url,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log('getCurrentUser', response);
      return response;
    }).catch(error => {
      console.error(error);
      return {
        success: false,
        error: error
      }
    });
};