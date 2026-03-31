import { saveSession } from '../../utils/session';

export function saveUserSession(response, expectedRole) {
  const user = response?.data;
  const token = response?.token;

  if (!user || !token) {
    throw new Error('Invalid server response.');
  }

  if (user.role !== expectedRole) {
    throw new Error(`This account is not an ${expectedRole} account.`);
  }

  saveSession(token, user);
}

export function getLoginError(error) {
  return error?.response?.data?.message || error.message || 'Unable to login. Please try again.';
}
