import * as config from '../config';

export const signup = (email, password, name) => {
  const url = `${config.apiHost}v1/signup`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
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
  const url = `${config.apiHost}v1/verify`;

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
  const url = `${config.apiHost}v1/login`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
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