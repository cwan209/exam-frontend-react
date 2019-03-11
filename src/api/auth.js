import * as config from '../config';

export const signup = (email, password) => {
  const url = `${config.apiHost}v1/signup`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
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