import { combineReducers } from 'redux';
import {authReducer}  from './authReducer';
import {errorReducer}  from './errorSnackBarReducer';
import {lessSnackBarReducer} from './lesserSnackBarReducer';

export default combineReducers({
  authReducer,
  errorReducer,
  lessSnackBarReducer
})