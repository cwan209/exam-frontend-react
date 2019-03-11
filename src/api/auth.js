import * as config from '../config';

export const signup = (email, password) => {
  const url = `${config.apiHost}v1/signup`;
  console.log(url);

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
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then(response => {
      console.debug(response);
      return {
        success: true,
        payload: response
      }
      // ...
    }).catch(error => {
      console.error(error);
      return {
        success: false,
        error: error
      }
    });
};