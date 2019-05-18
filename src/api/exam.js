import * as config from "../config";
import {getAuthToken} from "../helper/authHelper";

export const createNewExam = title => {
  const url = `${config.apiHost}/v1/exams`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
      body: JSON.stringify({
        title: title
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log('createNewExam', response);
      return response;
    });
};

export const getExamById = id => {
  const url = `${config.apiHost}/v1/exams/${id}`;

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
      console.log('getExamById', response);
      return response;
    });
};