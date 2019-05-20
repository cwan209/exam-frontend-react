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

export const getExams = () => {
  const url = `${config.apiHost}/v1/exams`;

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
      console.log('getExams', response);
      return response;
    });
};

export const addTrueOrFalse = examId => {
  const url = `${config.apiHost}/v1/exams/${examId}/trueOrFalse`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log('addTrueOrFalse', response);
      return response;
    });
};

export const updateTrueOrFalse = (examId, question) => {
  const url = `${config.apiHost}/v1/exams/${examId}/trueOrFalse`;

  console.log(question);
  return fetch(url,
    {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      },
      body: JSON.stringify({
        content: question.content,
        id: question.id,
        answer: question.answer
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log('updateTrueOrFalse', response);
      return response;
    });
};


export const addMultipleChoice = examId => {
  const url = `${config.apiHost}/v1/exams/${examId}/multipleChoice`;

  return fetch(url,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthToken()
      }
    })
    .then(response => response.json())
    .then(response => {
      console.log('addMultipleChoice', response);
      return response;
    });
};
