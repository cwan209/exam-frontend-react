import { combineReducers } from 'redux';
import {authReducer}  from './authReducer';
import {errorReducer}  from './errorSnackBarReducer';

export default combineReducers({
  authReducer,
  errorReducer
})