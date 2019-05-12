export const saveUser = (user, token) => ({
  type: 'SAVE_USER',
  user,
  token
});

export const logout = () => ({
  type: 'LOG_OUT'
});

