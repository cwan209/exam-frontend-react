const initialState = {
  open: false,
  errorMessage: ''
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SHOW_GLOBAL_ERROR':
      return {
        ...state,
        errorMessage: action.errorMessage,
        open: true
      };

    case 'HIDE_GLOBAL_ERROR':
      return {
        ...state,
        errorMessage: '',
        open: false
      };

    default:
      return state
  }
};

