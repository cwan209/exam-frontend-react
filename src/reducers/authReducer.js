const initialState = {
  user: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER':
      console.log(action);
      return {
        ...state,
        user: action.user
      };
    default:
      return state
  }
};

