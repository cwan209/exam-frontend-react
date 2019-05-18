export const showGlobalError = errorMessage => ({
  type: 'SHOW_GLOBAL_ERROR',
  errorMessage
});

export const hideGlobalError = () => ({
  type: 'HIDE_GLOBAL_ERROR',
});
