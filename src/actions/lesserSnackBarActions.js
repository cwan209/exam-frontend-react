export const showLesserSnackBarSuccess = message => ({
  type: 'SHOW_LESSER_MESSAGE_SUCCESS',
  message
});

export const showLesserSnackBarError = message => ({
  type: 'SHOW_LESSER_MESSAGE_ERROR',
  message
});

export const hideLesserSnackBarMessage = () => ({
  type: 'HIDE_LESSER_MESSAGE',
});
