// response messages
const articleDeletedMsg = 'Article removed!';

// error messages
const defualtErrorMsg = 'An error has occured on the server';
const badRequestErrorMsg = 'Invalid data submitted';
const conflictErrorMsg = 'This email has already been taken!';
const forbiddenActionErrorMsg = "Can't delete another user's articles";
const articleNotFoundMsg = 'Could not find requested article';
const userNotFoundMsg = 'Could not find requested user';
const pathNotFoundMsg = 'Path not found';
const incorrectCredentialsMsg = 'Incorrect email or password';
const authenticationFailedMsg = 'Authentication failed!';

module.exports = {
  articleDeletedMsg,
  defualtErrorMsg,
  badRequestErrorMsg,
  conflictErrorMsg,
  forbiddenActionErrorMsg,
  articleNotFoundMsg,
  userNotFoundMsg,
  pathNotFoundMsg,
  incorrectCredentialsMsg,
  authenticationFailedMsg,
};
