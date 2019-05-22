const initialState = {
  open: false,
  message: '',
  variant: ''
};

export const lessSnackBarReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SHOW_LESSER_MESSAGE_SUCCESS':
      return {
        ...state,
        message: action.message,
        variant: 'success',
        open: true
      };

    case 'SHOW_LESSER_MESSAGE_ERROR':
      return {
        ...state,
        message: action.message,
        variant: 'error',
        open: true
      };

    case 'HIDE_GLOBAL_ERROR':
      return {
        ...state,
        message: '',
        open: false
      };

    default:
      return state
  }
};

