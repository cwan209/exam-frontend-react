const initialState = {
  user: null,
  loggedIn: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'SAVE_USER':
      localStorage.setItem('token', action.token);
      return {
        ...state,
        user: action.user,
        loggedIn: true
      };

    case 'LOG_OUT':
      localStorage.removeItem('token');
      return {
        ...state,
        user: null,
        loggedIn: false
      };

    default:
      return state
  }
};

